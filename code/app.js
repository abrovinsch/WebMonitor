// WebMon 1.0

var inspector = new Vue({
  el: '.inspector',
  data: {
    description: 'Description',
    title: 'Title',
    projects: []
  },

})

var navmenu = new Vue({
  el: '.navmenu',
  data: {
    projects: []
  },
  methods: {
    select_node: function (node) {
      inspector.title = node.title + " - " + node.serial;
      inspector.description = node.online ? "Online" : "Offline";
    },
    select_zone: function (zone) {
      inspector.title = zone.title;
      zone.open = !zone.open;
      inspector.description = "";
    }
  }
})

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNode()
{
  var o = getRandomInt(0,3) == 1 ? false : true;

  var types = ["ZRA", "P4", "WLink", "PQuick", "Fixvolt"]
  var type = types[Math.floor(Math.random() * types.length)];
  var symb = 'scanner';

  if(type == "WLink")
  {
    symb = 'wifi';
  }
  if(type == "Fixvolt")
  {
    symb = 'power_input';
  }

  return {
    title: type,
    online: o,
    symbol: symb,
    serial: getRandomInt(748800, 749000),
  }
}

document.title = "WebMon 1";

for(var i = 0; i<3; i++)
{

  var x = {
    title: 'Project ' + (i+1),
    open: true,
    zones: []
  }

  for(var j = 0; j < getRandomInt(1,4); j++)
  {
    var z = {
      title: 'Zone ' + (j+1),
      open: true,
      nodes: []
    }

    x.zones.push(z);
  }

  x.zones.forEach(function(zone) {
    for(var j = 0; j < getRandomInt(1,27); j++)
    {
      zone.nodes.push(getRandomNode());
    }
  });
  navmenu.projects.push(x);
}
