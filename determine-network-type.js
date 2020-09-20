
const os            = require('os');
const fs            = require('fs');
const path          = require('path');

var   result        = '';

const ifaceList     = os.networkInterfaces();
var   ifaceNames    = Object.keys(ifaceList);

ifaceNames = ifaceNames.filter(name => ! (name.toLowerCase().startsWith('vethernet') && !name.toLowerCase().match(/primary virtual switch/i)));
ifaceNames = ifaceNames.filter(name => !name.toLowerCase().startsWith('vmware'));
ifaceNames = ifaceNames.filter(name => !name.toLowerCase().startsWith('virtualbox'));

var   ifaces = ifaceNames.reduce((m, name) => {
  ifaceList[name].forEach(iface => {
    if (iface.family !== 'IPv4')        { return; }
    if (iface.internal)                 { return; }
    if (iface.cidr.startsWith('172'))   { return; }

    m.push({...iface, name});
  });

  return m;
}, []);

var haveNet15 = false;
var haveNet   = false;
ifaces.forEach(iface => {
  if (iface.address.startsWith('15.'))            { console.log(`${iface.cidr}   ${iface.name}`); result += `export NETWORK_TYPE="net15"\n`; haveNet = haveNet15 = true; }
  else if (iface.address.startsWith('16.'))       { console.log(`${iface.cidr}   ${iface.name}`); result += `export NETWORK_TYPE="net15"\n`; haveNet = haveNet15 = true; }
});

if (!haveNet15) {
  ifaces.forEach(iface => {
    if (iface.address.startsWith('192.'))         { console.log(`${iface.cidr}   ${iface.name}`); result += `export NETWORK_TYPE="home"\n`;  haveNet = true; }
    else if (iface.address.startsWith('10.'))     { console.log(`${iface.cidr}   ${iface.name}`); result += `export NETWORK_TYPE="net10"\n`; haveNet = true; }
  });
}

var haveNetworkAndWifi = false;
if (haveNet15) {
  ifaces.forEach(iface => {
    if (iface.address.startsWith('10.'))          { console.log(`${iface.cidr}   ${iface.name}`); result += `export NETWORK_WITH_WIFI="net10"\n`; haveNetworkAndWifi = false; }
  });
}

// console.log(result, path.join(os.tmpdir(), 'network-type'));

//fs.writeFileSync(path.join(os.tmpdir(), 'network-type'), result);
fs.writeFileSync(path.join(process.env.TMP, 'network-type'), result);

