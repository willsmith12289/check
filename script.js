$(document).ready(function()
{
	/**
	*
	*Creates the chess board
	*
	*/
  $("#one td:odd").addClass('white');
  $("#one td:even").addClass('black');

  $("#two td:even").addClass('white');
  $("#two td:odd").addClass('black');

  $("#three td:odd").addClass('white');
  $("#three td:even").addClass('black');

  $("#four td:even").addClass('white');
  $("#four td:odd").addClass('black');

  $("#five td:odd").addClass('white');
  $("#five td:even").addClass('black');

  $("#six td:even").addClass('white');
  $("#six td:odd").addClass('black');

  $("#seven td:odd").addClass('white');
  $("#seven td:even").addClass('black');

  $("#eight td:even").addClass('white');
  $("#eight td:odd").addClass('black');

/*
**
*adds class active to circle playing pieces
*
*/
  $('.circle').click(function() {
  	$('.active').removeClass('active');
  	$(this).addClass('active');

  })
/*
*
*finds class(white or black)of cell origen and destination and only allows moves *if they are the same 
*
*/
  $('td').click(function() {
  	var cellClass = $('.active').parent().attr('class');
    var firstIndex = $(this).index();
      var indexP = firstIndex + 1;
      var indexM = firstIndex - 1;
      $('td').click(function() {
        secIndex = $(this).index();
        if(cellClass == $(this).attr('class')){
          if (secIndex == indexP) {
            $('.active').appendTo(this);
            }else{
              if (secIndex == indexM) {
                $('.active').appendTo(this);
              }
            }  

          }

      });

  });
   $('.circle').click(function(){
              if ($(this).attr('class') == ("circle")) {
                $(this).remove();
              }
            });


});

