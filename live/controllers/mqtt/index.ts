import mqtt  from 'mqtt'
import config from '../../config'

export module MQTTController {

    // Return the information of the MQTT Client 
    export async function getConfiguration() {
        var data = {
            'hostname': config.mqttHostname,
            'topic': config.topic,
            'port': config.mqttPort
        }
        return data
    }
}