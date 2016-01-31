(function(){
  $('.navbar-collapse').on('show.bs.collapse', function() {
    $('.navbar').css('background-image', 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(/assets/images/header.jpg)');
  });

  $('.navbar-collapse').on('hide.bs.collapse', function() {
    $('.navbar').css('background-image', '');
  });
})();