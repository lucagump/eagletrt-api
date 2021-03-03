import mqtt from 'mqtt';
import config from '../config';

var mqttUri = 'mqtt://' + config.mqttHostname + ':' + config.mqttPort;
var client = mqtt.connect(mqttUri);

function returnRandomFloat(min: number, max: number ) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

export module helpers {
    export function startStream() {

        setInterval(function() {

            var latitude = returnRandomFloat(-100, 100);
            var longitude = returnRandomFloat(-100, 100);
            var elevation = returnRandomFloat(-10, 10);
            var speed = returnRandomFloat(0, 50);
            var odometry = returnRandomFloat(0, 100);
            var steering_angle = returnRandomFloat(-20, 20);
            var throttle = returnRandomFloat(0, 1);
            var brake = returnRandomFloat(0, 1);
            var x_a = returnRandomFloat(-0.5, 0.5);
            var y_a = returnRandomFloat(-.05, 0.5);
            var z_a = returnRandomFloat(-0.1, 0.1);
            var x_b = returnRandomFloat(-0.5, 0.5);
            var y_b = returnRandomFloat(-0.5, 0.5);
            var z_b = returnRandomFloat(-0.1, 0.1);
            var x_c = returnRandomFloat(-3, 3);
            var y_c = returnRandomFloat(-3, 3);
            var z_c = returnRandomFloat(-3, 3);
            var voltage = returnRandomFloat(300, 400);
            var current_a = returnRandomFloat(1.0, 1.1);
            var current_b = returnRandomFloat(1.0, 1.1);
            var current_c = returnRandomFloat(1.0, 1.1);
            var temperature_a = returnRandomFloat(37, 47);

            /* Publish random data to the corresponding MQTT topic as a JSON string  */
            client.publish(config.topic, JSON.stringify({

                'latitude': latitude,
                'longitude': longitude,
                'elevation': elevation,
                'speed': speed,
                'odometry': odometry,
                'steering_angle': steering_angle,
                'throttle': throttle,
                'brake': brake,
                'x_a': x_a,
                'y_a': y_b,
                'z_a': z_c,
                'x_b': x_b,
                'y_b': y_b,
                'z_b': z_b,
                'x_c': x_c,
                'y_c': y_b,
                'z_c': y_c,
                'voltage': voltage,
                'current_a': current_a,
                'current_b': current_b,
                'current_c': current_c,
                'temperature_a': temperature_a

            }));

        }, config.msFrequency);
    }
}