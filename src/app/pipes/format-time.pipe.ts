import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }

}



@Pipe({
  name: 'daysLeft'
})
export class DaysLeftPipe implements PipeTransform {

  transform(value: string): string {
    const targetDate = new Date(value);
    const today = new Date();
    const timeDiff = targetDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    return daysDiff <= 0 ? "Expired" : daysDiff.toString();
  }

}



@Pipe({
  name: 'dateOnly'
})
export class DateOnlyPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: string): string {
    // const dateArray = value.split(' ')[0].split('-');
    // const year = Number(dateArray[0]);
    // const month = Number(dateArray[1]) - 1; // months are zero-indexed
    // const day = Number(dateArray[2]);
    // const dateObj = new Date(year, month, day);
    // return this.datePipe.transform(dateObj, 'yyyy-MM-dd');

    const date = new Date(value);
    date.setDate(date.getDate() + 30);

    const targetDate = new Date(date);
    const today = new Date();
    const timeDiff = targetDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    return daysDiff <= 0 ? "Expired" : daysDiff.toString();

    // return this.datePipe.transform(date, 'yyyy-MM-dd')!;

  }

}
