// WebMon 1.0

var app = new Vue({
  el: '#app',
  data: {
    description: 'Description',
    title: 'Title',
    projects: [
      {
        title: 'Project 1 ',
        open: true,
        zones: [
          {
            title: 'Zone 1',
            open: true,
            nodes: [
              {title: 'P4', serial: 748977}
            ]
          },
          {
            title: 'Zone 2',
            open: true,
            nodes: [
              {title: 'P4', serial: 748977}
            ]
          },
          {
            title: 'Zone 3',
            open: false,
            nodes: [
              {title: 'P4', serial: 748977}
            ]
          }
        ]
      },
      {
        title: 'Project 2',
        open: false,
        zones: [
          {
            title: 'Zone 1',
            open: true,
            nodes: [
              {title: 'P4', serial: 748977}
            ]
          },
          {
            title: 'Zone 2',
            open: true,
            nodes: [
              {title: 'P4', serial: 748977},
              {title: 'P4', serial: 748977},
              {title: 'P4', serial: 748977},
              {title: 'P4', serial: 748977},
              {title: 'P4', serial: 748977}
            ]
          },
          {
            title: 'Zone 3',
            open: true,
            nodes: [
              {title: 'P4', serial: 748977}
            ]
          }
        ]
      }
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
