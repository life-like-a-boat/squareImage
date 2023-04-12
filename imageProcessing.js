function readResizePlaceImage() {
  // get input element and uploaded file
  const fileInput = document.getElementById("file-input");
  const file = fileInput.files[0];
  
  // create image element and load uploaded file as source
  const img = new Image();
  img.src = URL.createObjectURL(file);
  
  // create canvas and draw image on it
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  img.onload = function() {
    // calculate new image dimensions and draw resized image on canvas
    const newHeight = 1200;
    const scaleFactor = newHeight / img.height;
    const newWidth = img.width * scaleFactor;
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    const resizedImageData = ctx.getImageData(0, 0, newWidth, newHeight);
    
    // create new image element and load background image as source
    const finalImageElement = document.getElementById("final-image");
    const backgroundImage = new Image();
    backgroundImage.src = "background.jpg";
    backgroundImage.onload = function() {
      // calculate position to center resized image on background image
      const backgroundWidth = backgroundImage.width;
      const backgroundHeight = backgroundImage.height;
      const x = (backgroundWidth - newWidth) / 2;
      const y = (backgroundHeight - newHeight) / 2;
      
      // draw background image and resized image on canvas
      canvas.width = backgroundWidth;
      canvas.height = backgroundHeight;
      ctx.drawImage(backgroundImage, 0, 0);
      ctx.putImageData(resizedImageData, x, y);
      
      // load canvas as source for final image element
      finalImageElement.src = canvas.toDataURL();
    }
  }
}
