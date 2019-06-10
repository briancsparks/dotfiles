#!/usr/bin/env node

// vim: ft=javascript:

const util      = require('util');
const AWS       = require('aws-sdk');
const route53   = new AWS.Route53();

const inspect   = function(x) { return util.inspect(x, {depth:null,colors:true}); }

const action    = process.argv[2];
const domain    = process.argv[3];

main();
function main() {
  return route53.listHostedZonesByName({DNSName: domain}, function(err, data) {
//    console.log(inspect({err, data}));
    if (err) { return callback(err, data); }
    if (!data || !data.HostedZones || data.HostedZones.length < 1) { return callback('bad'); }

    const zone = data.HostedZones[0];
    if (zone.Name === `${domain}.`) {
      return makeChange(zone.Id);
//      return callback(null, zone.Id);
    }

    return callback(null, {none:true});
  });

  function makeChange(HostedZoneId) {
		var ChangeBatch = {
			Changes: [{
				Action: action,
				ResourceRecordSet: {
					Name: `_acme-challenge.${process.env.CERTBOT_DOMAIN}.`,
					ResourceRecords: [{Value:`"${process.env.CERTBOT_VALIDATION}"`}],
					TTL: 30,
					Type: "TXT"
				}
			}],
		};

		var params = {ChangeBatch, HostedZoneId};
    return route53.changeResourceRecordSets(params, function(err, data) {
      if (err) { return callback(err); }
      if (data && data.ChangeInfo && data.ChangeInfo.Id) {
        return route53.waitFor('resourceRecordSetsChanged', {Id: data.ChangeInfo.Id}, function(err, data) {
          if (err) { return callback(err); }
          console.log(inspect(data));
          return callback(null, data);
        });
      }

      console.error(`fail change`, inspect({err, data}));
    });
  }

  function callback(err, data) {
    if (err) {
      console.error(err);
      process.exit(2);
      return {};
    }

    console.log(inspect(data));
    return data;
  }
}

/*

die() {
  echo "Usage:   $(basename $0) <action> <domain>"
  exit 2
}

ACTION="$1"
DOMAIN="$2"

[ -z $ACTION ] && die
[ -z $DOMAIN ] && die

scripts_dir="$(dirname $0)"

# See: https://hackernoon.com/easy-lets-encrypt-certificates-on-aws-79387767830b

HOSTED_ZONE="$(aws route53 list-hosted-zones-by-name | jq -r --arg DOMAIN "${DOMAIN}." '.HostedZones[] | select(.Name==$DOMAIN) | .Id')"
echo $HOSTED_ZONE

*/
