//define dependences

const http = require("http");
const app = require("./app");
const stage = require("./config");
const socket = require("socket.io");
const fetch = require("node-fetch");

const envoironment = process.env.NODE_ENV;
const server = http.createServer(app);
const port = stage[envoironment].port;
const hostName = stage[envoironment].hostName;
const io = socket(server);
const listHouse = [];
const listAlarm = [];

io.on("connection", function(socket) {
  console.log(socket.client.id);
  console.log("a user connected");
  //listHouse
  socket.on("listHouse", data => {
    fetch(`http://192.168.100.9:9999/houses/user/${JSON.parse(data).userId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(listHouse => {
        socket.emit("listHouse", JSON.stringify(listHouse));
      });
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  //listRoom
  socket.on("listRoomHouse", data => {
    console.log(data);
    fetch(
      `http://192.168.100.9:9999/rooms/house/${JSON.parse(data).houseId}`,
      {
        method: "GET"
      }
    )
      .then(response => {
        return response.json();
      })
      .then(listRoomHouse => {
        socket.emit("listRoomHouse", JSON.stringify(listRoomHouse));
      });
  });

  //listDeviceRoom
  socket.on("listDeviceRoom", data => {
    console.log(data);
    fetch(
      `http://192.168.100.9:9999/devices/room/${JSON.parse(data).roomId}`,
      {
        method: "GET"
      }
    )
      .then(response => {
        return response.json();
      })
      .then(listDeviceRoom => {
        socket.emit("listDeviceRoom", JSON.stringify(listDeviceRoom));
      });
  });

  //listDevice
  socket.on("listDevice", data => {
    console.log(data);
    fetch(
      `http://192.168.100.9:9999/devices/${JSON.parse(data).userId}/${
        JSON.parse(data).page
      }`,
      {
        method: "GET"
      }
    )
      .then(response => {
        return response.json();
      })
      .then(listDevice => {
        socket.emit("listDevice", JSON.stringify(listDevice));
      });
  });

  //list actions
  socket.on("listActions", () => {
    fetch(`http://192.168.100.9:9999/actions`, { mehtod: "GET" })
      .then(response => {
        return response.json();
      })
      .then(listActions => {
        socket.emit("listActions", JSON.stringify(listActions));
      });
  });
  //list alarms
  socket.on("listAlarms", data => {
    console.log(data);
    fetch(
      `http://192.168.100.9:9999/alarms/device/${JSON.parse(data).deviceId}`,
      {
        method: "GET"
      }
    )
      .then(response => {
        return response.json();
      })
      .then(listAlarms => {
        socket.emit("listAlarms", JSON.stringify(listAlarms));
      });
  });
  socket.on("addAlarm", async alarm => {
    await fetch("http://192.168.100.9:9999/alarms", {
      method: "POST",
      body: alarm,
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        socket.emit("addAlarm", JSON.stringify(result));
      });
  });

  //device info

  socket.on("deviceInfo", async deviceId => {
    await fetch(`http://192.168.100.9:9999/deviceInfo/device/${deviceId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        socket.emit("deviceInfo", JSON.stringify(result));
      });
  });

  socket.on("listDeviceInfo", async () => {
    await fetch(`http://192.168.100.9:9999/deviceInfo`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        socket.emit("listDeviceInfo", JSON.stringify(result));
      });
  });

  socket.on('editDeviceInfo',async (deviceInfo) => {
    console.log(deviceInfo);
    await fetch(`http://192.168.100.9:9999/deviceInfo`, {
      method: "PUT",
      body:deviceInfo,
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        socket.emit("editDeviceInfo", JSON.stringify(result));
      });
  });
});
server.listen(port, hostName, () => {
  console.log("server is running on 192.168.100.9:9999");
}); //npm run dev
