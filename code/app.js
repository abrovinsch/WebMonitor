// WebMon 1.0

var root_selection = {
  title: "Welcome to Camur Web Monitor",
  components: []
}


var inspector = new Vue({
  el: '.inspector',
  data: {
    title: "Welcome",
    selected: root_selection,
    components: [
    ]
  },
  methods: {
      updateLastValue: function (sel) {
        sel.last_value = Math.random() * 0.3;
      }
  }
})

var navmenu = new Vue({
  el: '.navmenu',
  data: {
    projects: [],
    selected: Object()
  },
  methods: {
    select_node: function (node, event) {
      inspector.title = node.title + " - " + node.node_type;
      inspector.description = node.online ? "Online" : "Offline";
      inspector.selected.selected = false;
      inspector.selected = node;
      node.selected = true;
    },
    select_zone: function (zone) {
      inspector.title = zone.title;
      zone.open = !zone.open;
      inspector.description = "";
      this.selected = zone;
    }
  }
})

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNode()
{
  var _online = getRandomInt(0,3) == 1 ? false : true;
  var _alarm = getRandomInt(0,10) == 1 ? true : false;
  var types = ["ZRA", "P4", "WLink", "PQuick", "Fixvolt"]
  var _type = types[Math.floor(Math.random() * types.length)];
  var symb = 'scanner';
  var ver = "3." + getRandomInt(3,7);
  var _last_value = Math.random() * 0.3;

  var comps = [
    {type: "node info", open: true},
    {type: "last values", open: true},
  ];

  if(_type == "WLink")
  {
    symb = 'wifi';
    comps.push({type: "wlink", open: true})
  }
  if(_type == "Fixvolt")
  {
    symb = 'power_input';
    comps.push({type: "fixvolt", open: true})
  }

  return {
    title: getRandomInt(748800, 749000),
    online: _online,
    alarm: _alarm,
    symbol: symb,
    node_type: _type,
    components: comps,
    version: ver,
    last_value: _last_value,
    selected: false
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
