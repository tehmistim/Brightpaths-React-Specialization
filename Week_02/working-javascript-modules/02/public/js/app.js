(function (){
  function getSessions(){
    return new Promise(function(resolve, reject){
      var oReq = new XMLHttpRequest();
      oReq.onload = function (e) {
        resolve(e.target.response);
      };
      oReq.open('GET', 'sessions.json', true);
      oReq.responseType = 'json';
      oReq.send();
    })
  }
  function sessionTemplate (sessions) {
  
  // If there are no list items
  if (sessions < 1) return '<p><em>You do not have any list items yet. Try adding one with the form above.</em></p>';
  
  return '' +
    sessions.map(function (item) {
      return `<div class="col-xs-12 col-sm-4 col-md-4 adj_text"><h3>${item.title}</h3>
    <p>${item.tagline}</p>
    <img src="${item.img}" alt="${item.alt}" />
  
    <div class="read-more-btn">
      <a href="${item.link}" class="btn-oval">Learn More</a>
    </div></div>`
    }).join('') + '';
  
  };
  
  function render() {
    var list = document.querySelector('#sessions');
    if (!list) return;
    list.innerHTML = sessionTemplate(data.listItems);
  };
  
  
  var data = {
    listItems: []
  };
  
  getSessions()
    .then((sessions)=>{
      console.log('promises!')
      data.listItems = sessions;
      render();
    });
}())
