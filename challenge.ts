import ShipmentQueue, { OperationResult } from "./shipmentQueue";

async function sleep(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
}

async function randomDelay() {
  const randomTime = Math.round(Math.random() * 1000);
  return sleep(randomTime);
}

class ShipmentSearchIndex {
  async updateShipment(id: string, shipmentData: any) {
    const startTime = new Date();
    await randomDelay();
    const endTime = new Date();
    console.log(
      `update ${id}@${startTime.toISOString()} finished@${endTime.toISOString()}`
    );

    return { startTime, endTime };
  }
}

// Implementation needed
interface ShipmentUpdateListenerInterface {
  receiveUpdate(id: string, shipmentData: any);
}

// Implementation
class ShipmentUpdateListener implements ShipmentUpdateListenerInterface {
  private shipmentSearch: ShipmentSearchIndex;
  private shipmentQueue: ShipmentQueue;

  constructor() {
    this.shipmentSearch = new ShipmentSearchIndex();
    this.shipmentQueue = new ShipmentQueue();
  }

  async receiveUpdate(id: string, shipmentData: any) {
    const promise: Promise<
      OperationResult
    > = this.shipmentSearch.updateShipment(id, shipmentData);
    await this.shipmentQueue.addToQueue(id, promise);
  }
}

const shipmentUpdateListener = new ShipmentUpdateListener();

shipmentUpdateListener
  .receiveUpdate("1", { data: { more: "data" } })
  .then(() => {
    return shipmentUpdateListener.receiveUpdate("1", {
      seconData: { more: "data" }
    });
  })
  .then(() => console.log("Final promise"))
  .catch(console.error);
