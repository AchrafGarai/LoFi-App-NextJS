type Listener = (value : any) => void; 

type Topics = {
    [name: string]: Listener[];
  };

export const createPubSub = () => {
    let topics : Topics = {};
    let destroyed = false ; 
    
    const getTopic = (name : string) => {
        if (!topics[name]){
            topics[name] = [];
        }

        return topics[name];
    }; 

    return {
        subscribe(topic : string , fn : Listener){
            const listeners = getTopic(topic);

            listeners.push(fn);

            const unsubscribe = () => {
                const index = listeners.indexOf(fn);

                listeners.splice (index, 1);
            }
            return unsubscribe
        },

        publish(topic : string, value : any) {
            const listeners = getTopic(topic); 
            const currentListenerts = listeners.slice();

            currentListenerts.forEach((listener) =>{
                if (!destroyed){
                    listener(value);
                }
            });
        },

        destroy() {
            topics = {};
            destroyed = true;
        }
    }
}