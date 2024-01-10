import { Injectable } from '@angular/core';


import { Http, HttpResponse, HttpOptions } from '@capacitor-community/http';



@Injectable({
  providedIn: 'root'
})
export class FileUplaodService {

  constructor() { }

  async uploadCSVFile(file: File): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log(formData[0] + ', ' + formData[1]);

      var options = { content: formData };
      console.log(options);

      console.log(formData);
      let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGVmNDUwYjIxODMwODNjZjNlYmFhZmM4MjM1MTc0ZTY0MjJjODY5ZDdjMGIxYmUwZThiMGMzOWJlM2ZlN2JiYzEwMzBkNjExODZkMWQxNjAiLCJpYXQiOjE2OTgwNDEwMzguODExODgyLCJuYmYiOjE2OTgwNDEwMzguODExODg2LCJleHAiOjE3Mjk2NjM0MzguODAwODcxLCJzdWIiOiI0MTMiLCJzY29wZXMiOltdfQ.nkawACHSv0POvQMSBmRL7Kx_U4OsD2ej8Wv-vg8-DzCZkPawXW9hGk3HqtQL0d10TR2cWsOEGkAQfUaeyAikuUdsur-p9YQr7MzLp3zGXbcMuNDnsl25D6SUtI9KrO1ovoGB0YBpZzRitRUG0_7M2ryIcBn-mqUODDtVqRNksgnTNXR8jrhrmOp1jHZQo0PxOb3eVjKS3ygbwqF5X6M8tMQ7ilok716j_9iFwIi9VlaqecMlg7raptZi-YkcDSYEKTYz5t0x2yjAX3t81fH4tkE669HwLtRTgBYXZFbrFsHdxYp5_rfZz-3qqT3yBfABtVdy698HY9zzAHqqOgMuLZBGjOw610RUhKXfalW21mz9K39kyaODYlN5T8z_oCQOAnGUBwtAsXQNTWkpKrHfkYZYvP46BK6_yVgH-FBo7HMkbuCqw_766vJa7S11_QKRJJuyscJ0maSfI0y3jALMdzfyVenX8Co_643bccCfeORuUZp26VxuH7kFjFOizWj4laR1icfOEV5OYsQr1RBENaFnIE9JKhrHtFrAei9R6dFXXgRaglcIvcPseIKMC-7yLKg4acCa9sqm5gT1ovkmv23UfkZ3rX7bYbhdap3AP5tCtvnaaprZKVVZIT14WG1SnjE-JQ5BIYFVtDvRVUHafFxxmusloHqB4zZvGzFQJTw";

      const response: HttpResponse = await Http.request({
        method: 'POST',
        url: 'https://cp.purvaconnect.com/api/upload-csv',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${token}`
        },
        data: options,
      });
      console.log(response);

      if (response.status === 200) {
        console.log('File uploaded successfully.');
      } else {
        console.error('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error while uploading file:', error);
    }
  }

}

