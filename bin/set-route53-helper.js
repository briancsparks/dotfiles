
const util      = require('util');
const AWS       = require('aws-sdk');
const route53   = new AWS.Route53();

const [x,y, action, subdomain, domain, ip] = process.argv;

(async function main() {
  var ok = false;
  var hz;
  
  try {
    const {HostedZones} = hz = await route53.listHostedZonesByName({DNSName: domain}).promise();

    if (HostedZones.length > 0) {
      const zone = HostedZones[0];
      if (zone.Name === `${domain}.`) {
        const HostedZoneId = zone.Id;
        const ChangeBatch = changeBatch();
        const {ChangeInfo} = await route53.changeResourceRecordSets({HostedZoneId, ChangeBatch}).promise();
        console.log(`change`, {HostedZoneId, ChangeBatch, ChangeInfo});
        const result = await route53.waitFor('resourceRecordSetsChanged', {Id: ChangeInfo.Id}).promise();

        ok = true;
      }
    } else {
      console.error(`Did not find domain: ${domain}`);
    }
  } catch(err) {
    console.error(err);
    process.exit(3);
  }
  
  if (!ok) {
    console.error(`Fail!`, util.inspect({AWS_PROFILE: process.env.AWS_PROFILE, domain, hz:{...hz, HostedZones: hz.HostedZones.map(z => z.Name)}}, {depth:null, colors:true}));
  }
}());

function changeBatch() {
  return {
    Changes: [{
      Action: action,
      ResourceRecordSet: {
        Name: `${subdomain}.${domain}.`,
        ResourceRecords: [{Value:`${ip}`}],
        TTL: 30,
        Type: "A"
      }
    }],
  };
}

