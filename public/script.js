$(function(){
    var peerReviewCanvas = $('#peer-review')[0];
    var peerReviewCtx = peerReviewCanvas.getContext('2d');
    var colors = [
        'red',
        'orange',
        'yellow',
        'blue',
        'purple',
        'green',
        'brown',
        'black',
        'silver',
        'gold',
        'pink'
    ];

    // Draw the chart.
    peerReviewCtx.fillText('Peer Review', 10, 10);
    for(i=0; i<11; i++){
        peerReviewCtx.fillText(10-i, 10, 30+(i*20));
        peerReviewCtx.moveTo(25, 30+(i*20));
        peerReviewCtx.lineTo(200, 30+(i*20));
    }
    peerReviewCtx.stroke();

    // Draw the peer review bars.
    $.ajax({
        url: '/peerReview.json',
        dataType: 'json',
        success: function(data){
            var categories = Object.keys(data);
            categories.forEach(function(category, index){
              var value = data[category];
              var x = 30 + index * 10;
              var y = 30 + (10 - value) * 20;
              var height = value * 20;
              peerReviewCtx.fillStyle = colors[index];
              peerReviewCtx.fillRect(x, y, 5, height);
              peerReviewCtx.fillRect(100, 80 + 20 * index, 10, 10);
              peerReviewCtx.strokeText(category, 120, 90 + 20 * index);
            });
        }
    });

  // Draw the point distribution graph
  var pointDistCtx = $('#point-distribution')[0];
  $.ajax({
      url: '/pointDistribution.json',
      dataType: 'json',
      success: function(data){
          var people = Object.keys(data);
          var total = Object.values(data).reduce(function(acc, value){
              return acc + value;
          }, 0);
          var angle = 0;
          people.forEach(function(person){
              var percent = data[person] / total;
              pointDistCtx.arc(100, 100, 80, angle, angle + percent * 2 * Math.PI);
          });

      }
  })
});
