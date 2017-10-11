import SigV4Utils from './SigV4Utils';
const moment = window.moment;

export default class Endpoint 
{
  constructor()
  {
    
  }

  static create(regionName, awsIotEndpoint, accessKey, secretKey)
  {
    let time = moment.utc();
    let dateStamp = time.format('YYYYMMDD');
    let amzdate = dateStamp + 'T' + time.format('HHmmss') + 'Z';
    let service = 'iotdevicegateway';
    let region = regionName;
    let algorithm = 'AWS4-HMAC-SHA256';
    let method = 'GET';
    let canonicalUri = '/mqtt';
    let host = awsIotEndpoint;

    let credentialScope = dateStamp + '/' + region + '/' + service + '/' + 'aws4_request';
    let canonicalQuerystring = 'X-Amz-Algorithm=AWS4-HMAC-SHA256';
    canonicalQuerystring += '&X-Amz-Credential=' + encodeURIComponent(accessKey + '/' + credentialScope);
    canonicalQuerystring += '&X-Amz-Date=' + amzdate;
    canonicalQuerystring += '&X-Amz-SignedHeaders=host';

    let canonicalHeaders = 'host:' + host + '\n';
    let payloadHash = SigV4Utils.sha256('');
    let canonicalRequest = method + '\n' + canonicalUri + '\n' + canonicalQuerystring + '\n' + canonicalHeaders + '\nhost\n' + payloadHash;

    let stringToSign = algorithm + '\n' +  amzdate + '\n' +  credentialScope + '\n' +  SigV4Utils.sha256(canonicalRequest);
    let signingKey = SigV4Utils.getSignatureKey(secretKey, dateStamp, region, service);
    let signature = SigV4Utils.sign(signingKey, stringToSign);

    canonicalQuerystring += '&X-Amz-Signature=' + signature;
    return 'wss://' + host + canonicalUri + '?' + canonicalQuerystring;
  }
}