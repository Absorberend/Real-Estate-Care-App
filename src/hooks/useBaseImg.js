import {useState} from 'react'

export default function useBaseImg() {
    const [srcEncoded, setSrcEncoded] = useState("");

    function base64(file) {
      return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.onload = (event) => {
            resolve(fileReader.result);
              
            const imgElement = document.createElement("img");
            imgElement.src = event.target.result;

            imgElement.onload = function (e) {
              const canvas = document.createElement("canvas");
              const MAX_WIDTH = 300;
        
              const scaleSize = MAX_WIDTH / e.target.width;
              canvas.width = MAX_WIDTH;
              canvas.height = e.target.height * scaleSize;
        
              const ctx = canvas.getContext("2d");
        
              ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
        
              const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
              setSrcEncoded(srcEncoded);
            };
          }

          fileReader.onerror = (error) => {
              reject(error);
          };
        })
      }

      const uploadImage = async (event) => {
        const file = event.target.files[0];
        await base64(file);
      };
    
    
    return {uploadImage, srcEncoded }

  };

