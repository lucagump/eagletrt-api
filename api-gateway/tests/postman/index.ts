import newman from 'newman';
import * as path from 'path';
import { ChildProcess, spawn } from 'child_process';

export default async function() {
    
    describe('Api Gateway / Postaman Tests', () => {
        let childServer: ChildProcess;
        
        before(async function() {
            this.timeout(7500);
            childServer = spawn('node', ['dist/index.js']);
            await new Promise((res) => setTimeout(res, 7000));
        });

        after(async function() {
            console.log('Killing server in background ...');
            childServer.kill('SIGINT');
        });


        async function runPostmanTests(collectionPath: string) {
            await new Promise((resolve, reject) => {
                newman.run({
                    collection: require(path.join(__dirname, collectionPath)),
                    reporters: 'cli',
                }, function (err, summary) {
                    if (err) { 
                        reject(err);
                    }
                    if (summary.run.failures.length > 0) {
                        reject(`${summary.run.failures.length} postman errors`);
                    }
                    resolve(null);
                });
            });
        }

        it('Should run postman tests', async function(this: Mocha.Context) {
            this.timeout(20000);
            await runPostmanTests(
                '../../../tests/postman/eagletrt-api.postman_collection.json'
            );
        });
    });
}
