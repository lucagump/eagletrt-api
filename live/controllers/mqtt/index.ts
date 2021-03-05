import mqtt  from 'mqtt'
import config from '../../config'

export class MQTTController {

    // Return the information of the MQTT Client 
    public async getConfiguration() {
        var data = {
            'hostname': config.mqttHostname,
            'topic': config.topic,
            'port': config.mqttPort
        }
        return data
    }
}