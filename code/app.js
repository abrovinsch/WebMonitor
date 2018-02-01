// WebMon 1.0

var app = new Vue({
  el: '#app',
  data: {
    description: 'Description',
    title: 'Title',
    buttons: [
      { title: 'Foo', l: 'X' },
      { title: 'Bar', l: 'X' }
    ]
  }
})

document.title = "WebMon 1";

function x()
{
  app3.seen = !app3.seen;
}


function Select()
{
  app.title = "P4";
  app.description = "Desc";
}

document.getElementById('hide-app3').addEventListener("click", Select);
