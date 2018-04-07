$(document).ready(function(){
  
    var imageBeingRotated = false ;
    var mouseStartAngle = false ; //旋轉開始前鼠標相對於圖片中心的角度
    var imageStartAngle = false ; //旋轉開始前圖片的旋轉角度

    $( initPhotos );
})

function initPhotos() {

    //控制放開滑鼠右鍵時停止轉動
    $(document).mouseup( stopRotate );
    $(".burn").each( function(index){
        // 替圖片設定隨機的位子跟角度
        var angle= Math.floor( Math.random() * 360 );
        $(this).css( 'transform' , 'rotate(' + angle + 'deg)');
        $(this).css( '-moz-transform' , 'rotate(0' + angle + 'deg)' );
        $(this).css( '-webkit-transform', 'rotate(' + angle + 'deg)' );
        $(this).css( '-o-transform', 'rotate(' + angle + 'deg)' );
        $(this).data( 'currentRotate', angle * Math.PI/180 ); //弧度=pi*角度/180

        //讓圖片旋轉
        $(this).mousedown( startRotate );
    })    
}

function startRotate( e ) {

 
    // Track the image that we're going to rotate
    imageBeingRotated = this;
  
    // Store the angle of the mouse at the start of the rotation
    var imageCenter = getImageCenter( imageBeingRotated );
    var mouseStartXFromCenter = e.pageX - imageCenter[0];
    var mouseStartYFromCenter = e.pageY - imageCenter[1];
    mouseStartAngle = Math.atan2( mouseStartYFromCenter, mouseStartXFromCenter );
  
    // Store the current rotation angle of the image at the start of the rotation
    imageStartAngle = $(imageBeingRotated).data('currentRotation');
  
    // Set up an event handler to rotate the image as the mouse is moved
    $(document).mousemove( rotateImage );
      // stop bubbling
    return false;
  }
  // stop rotating while mouse is up
  function stopRotate( e ) {
   
    if ( !imageBeingRotated ) return;
  
    // Remove the event handler that tracked mouse movements during the rotation
    $(document).unbind( 'mousemove' );
  
    // Cancel the image rotation by setting imageBeingRotated back to false.
    imageBeingRotated = false;
    return false;
  }
  function rotateImage( e ) {
  
    // Exit if there is no image being rotated
    if ( !imageBeingRotated ) return;
  
    // Calculate the new mouse angle relative to the image center
    var imageCenter = getImageCenter( imageBeingRotated );
    var mouseXFromCenter = e.pageX - imageCenter[0];
    var mouseYFromCenter = e.pageY - imageCenter[1];
    var mouseAngle = Math.atan2( mouseYFromCenter, mouseXFromCenter );
  
    // Calculate the new rotation angle for the image
    var rotateAngle = mouseAngle - mouseStartAngle + imageStartAngle;
  
    // Rotate the image to the new angle, and store the new angle
    $(imageBeingRotated).css('transform','rotate(' + rotateAngle + 'rad)');
    $(imageBeingRotated).css('-moz-transform','rotate(' + rotateAngle + 'rad)');
    $(imageBeingRotated).css('-webkit-transform','rotate(' + rotateAngle + 'rad)');
    $(imageBeingRotated).css('-o-transform','rotate(' + rotateAngle + 'rad)');
    $(imageBeingRotated).data('currentRotation', rotateAngle );
    
    return false;
  }
  function getImageCenter( image ) {
  
    // Rotate the image to 0 radians
    $(image).css('transform','rotate(0rad)');
    $(image).css('-moz-transform','rotate(0rad)');
    $(image).css('-webkit-transform','rotate(0rad)');
    $(image).css('-o-transform','rotate(0rad)');
  
    // Measure the image center
    var imageOffset = $(image).offset();
    var imageCenterX = imageOffset.left + $(image).width() / 2;
    var imageCenterY = imageOffset.top + $(image).height() / 2;
  
    // Rotate the image back to its previous angle
    var currentRotation = $(image).data('currentRotation');
    $(imageBeingRotated).css('transform','rotate(' + currentRotation + 'rad)');
    $(imageBeingRotated).css('-moz-transform','rotate(' + currentRotation + 'rad)');
    $(imageBeingRotated).css('-webkit-transform','rotate(' + currentRotation + 'rad)');
    $(imageBeingRotated).css('-o-transform','rotate(' + currentRotation + 'rad)');
  
    // Return the calculated center coordinates
    return Array( imageCenterX, imageCenterY );
  }