$('.anhthaythe').click(function (e) { 
    e.preventDefault();
    var anhmoi=$(this).attr('src')
    $('.anhhien').attr('src',anhmoi);
});