// VUE OBJECTS

var root_selection = {
  heading: "Welcome to Camur Web Monitor",
  components: [],
  selected: true
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
    requestLastValue: function (sel) {
      sel.waitingForLastValue = true;
      sendServerRequest("last_value/" + sel.title);
    },

    requestProject :function(prj){
      sendServerRequest("get_project/" + prj);
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
      node.heading = node.title + " - " + node.node_type;
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

// SERVER HANDLING

function sendServerRequest(command)
{
  var serverDomain = "http://127.0.0.1:5000";
  var url =  serverDomain + "/" + command;
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = receiveServerResponse;
  httpRequest.open('GET', url, true);
  httpRequest.send();
}

function receiveServerResponse() {
  if(this.readyState === 4){
    if (this.status === 200) {
      handleIncomingJSONMsg(this.responseText)
    } else {
      // There was a problem with the request
    }
  }
}

// APP

function handleIncomingJSONMsg(json)
{
  response = JSON.parse(json);
  if(response.response_type === "projectinfo")
  {
    updateProject(response.msg);
  }
  else if(response.response_type === "last_value"){
    updateLastValue(response.msg);
  }
}

function updateProject(proj)
{
  for (i = 0; i < proj.zones.length; i++)
  {
    proj.zones[i].open = true;
    for (j = 0; j < proj.zones[i].nodes.length; j++)
    {
      var comps = [
        {type: "node info", open: true},
      ];

      var symb = "scanner"
      if(proj.zones[i].nodes[j].node_type == "WLink")
      {
        symb = 'wifi';
        comps.push({type: "wlink", open: true})
      }

      if(proj.zones[i].nodes[j].node_type != "WLink")
      {
        comps.push({type: "last values", open: true})
      }

      if(proj.zones[i].nodes[j].node_type == "Fixvolt")
      {
        symb = 'power_input';
        comps.push({type: "fixvolt", open: true})
      }

      proj.zones[i].nodes[j].waitingForLastValue = false;

      proj.zones[i].nodes[j].components = comps;
      proj.zones[i].nodes[j].symbol = symb;
    }
  }
  navmenu.projects.push(proj);
}

function updateLastValue(last_val_obj)
{
  node = getNodeBySerial(last_val_obj.serial);
  node.last_value = last_val_obj.value;
  node.waitingForLastValue = false;
}

function getNodeBySerial(serial)
{
  //alert(serial);
  for (i = 0; i < navmenu.projects.length; i++)
  {
    for (j = 0; j < navmenu.projects[i].zones.length; j++)
    {
      for (k = 0; k < navmenu.projects[i].zones[j].nodes.length; k++)
      {
        if(navmenu.projects[i].zones[j].nodes[k].serial === serial)
        {
          return navmenu.projects[i].zones[j].nodes[k];
        }
      }
    }
  }
}

// BUILTIN FUNCTIONS
function onPageLoad()
{
  document.title = "WebMon 1";
  projects = 2

  for(var i = 0; i<projects; i++)
  {
    inspector.requestProject("Project " + (i+1));
  }
}

// START CODE
window.onload = onPageLoad();
