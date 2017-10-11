import EventEmitter from 'eventemitter3';
import Endpoint from './Endpoint';

export default class SocketClient
{
  // Data Type
  static DATA = 'data';
  static TEXT = 'text';


  constructor(params)
  {
    this.params = params;
    this.dataType = params.dataType || SocketClient.DATA;// data or text
    this._emitter = new EventEmitter();
  }

  connect()
  {
    let endpoint = Endpoint.create(
        this.params.region, // Your Region
        this.params.host, // Require 'lowercamelcase'!!
        this.params.accessKey, 
        this.params.accessSecret
    );
    let clientId = Math.random().toString(36).substring(7);
    let client = new window.Paho.MQTT.Client(endpoint, clientId);
    let connectOptions = {
      useSSL: true,
      timeout: 3,
      mqttVersion: 4,
      onSuccess: ()=>{
        client.subscribe(this.params.filter);
        this._emitter.emit('ready');
      }
    };
    client.onMessageArrived = (message)=>{
      try 
      {
        let text = message.payloadString;
        if (this.dataType == 'text')
        {
          this._emitter.emit('message', text);
        }
        else
        {
          this._emitter.emit('message', JSON.parse(text));
        }
      }
      catch(e) 
      {
        this._emitter.emit('error', e);
      }
    };
    client.onConnectionLost = (e)=>{
      this._emitter.emit('error', e);
    };
    client.connect(connectOptions);

    this.client = client;
  }

  emit(content)
  {
    if (!this.client) return;

    try 
    {
      if (this.dataType != 'text')
      {
        content = JSON.stringify(content);
      }
      
      var message = new window.Paho.MQTT.Message(content);
      message.destinationName = this.params.filter;
      this.client.send(message);
    }
    catch(e) 
    {
      this._emitter.emit('error', e);
    }
  }

  on(event, callback, target)
  {
    this._emitter.on(event, callback, target);
  }
}