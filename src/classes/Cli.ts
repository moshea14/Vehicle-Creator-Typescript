// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  // TODO: Update the constructor to accept Truck and Motorbike objects as well
  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers: { selectedVehicleVin: string | undefined; }) => {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          // TODO: Update the choices array to include Truck and Motorbike
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers: { vehicleType: string; }) => {
        if (answers.vehicleType === 'Car') {
          // create a car
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          // create a truck
          this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          // create a motorbike
          this.createMotorbike();
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
      ])
      .then((answers: { color: string; make: string; model: string; year: string; weight: string; topSpeed: string; }) => {
        const car = new Car(
          // TODO: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        // push the car to the vehicles array
        this.vehicles.push(car);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        },
      ])
      .then((answers: { color: string, make: string, model: string, year: string, weight: string, topSpeed: string, towingCapacity: string }) => {
        // const wheel1 = new Wheel();
        // const wheel2 = new Wheel();
        // const wheel3 = new Wheel();
        // const wheel4 = new Wheel();


        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          +answers.year,
          +answers.weight,
          +answers.topSpeed,
          [],
          +answers.towingCapacity,

        );
        this.vehicles.push(truck);

        // Set the selectedVehicleVin to the vin of the truck
        this.selectedVehicleVin = truck.vin;

        // Perform actions on the truck
        console.log(`Added truck: ${truck.make} ${truck.model}`);
        truck.printDetails();
        this.performActions();
      });
  }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter Front Wheel Diameter',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter Rear Wheel Diameter',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ])
      .then((answers: { color: string; make: string; model: string; year: number; weight: number; topSpeed: number; wheelSize: number | undefined; wheelBrand: string | undefined; }) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          answers.year,
          answers.weight,
          answers.topSpeed,
          [new Wheel(answers.wheelSize, answers.wheelBrand), new Wheel(answers.wheelSize, answers.wheelBrand)]
        );

        this.vehicles.push(motorbike);

        this.selectedVehicleVin = motorbike.vin;

        console.log(`Added motorbike: ${motorbike.make} ${motorbike.model}`);
        motorbike.printDetails();

        this.performActions();
      });

  }

  // method to find a vehicle to tow
  // TODO: add a parameter to accept a truck object
  findVehicleToTow(selectedVehicle: Truck): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle,
            };
          }),
        },
      ])

      .then((answers: any) => {
        const selectedVehicle = this.vehicles.find(vehicle => vehicle.vin === this.selectedVehicleVin);

        if (!selectedVehicle) {
          console.log('No vehicle selected.');
          this.performActions();
          return;
        }

        if (selectedVehicle instanceof Truck) {
          console.log('The truck cannot tow itself.');
          this.performActions();
        } else {
          const truck = this.vehicles.find(vehicle => vehicle instanceof Truck);
          if (truck) {
            truck.tow(selectedVehicle);
            this.performActions();
          } else {
            console.log('No truck available to tow the vehicle.');
            this.performActions();
          }
        }
      });
    // TODO: check if the selected vehicle is the truck
    // TODO: if it is, log that the truck cannot tow itself then perform actions on the truck to allow the user to select another action
    // TODO: if it is not, tow the selected vehicle then perform actions on the truck to allow the user to select another action

  }

  // method to perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          // TODO: add options to tow and wheelie
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Tow vehicle',
            'Wheelie',
            'Select or create another vehicle',
            'Exit',
          ],
        },
      ])
      .then((answers: { action: string; }) => {
        const selectedVehicle = this.vehicles.find((vehicleObj) => {
          if (vehicleObj.vin === this.selectedVehicleVin) {
            return vehicleObj;
          }

          return false;
        });

        // perform the selected action
        if (answers.action === 'Print details') {
          // find the selected vehicle and print its details
          selectedVehicle?.printDetails();
        } else if (answers.action === 'Start vehicle') {
          // find the selected vehicle and start it
          selectedVehicle?.start();
        } else if (answers.action === 'Accelerate 5 MPH') {
          // find the selected vehicle and accelerate it by 5 MPH
          selectedVehicle?.accelerate(5);
        } else if (answers.action === 'Decelerate 5 MPH') {
          // find the selected vehicle and decelerate it by 5 MPH
          selectedVehicle?.decelerate(5);

        } else if (answers.action === 'Stop vehicle') {
          // find the selected vehicle and stop it
          selectedVehicle?.stop();

        } else if (answers.action === 'Turn right') {
          // find the selected vehicle and turn it right
          selectedVehicle?.turn('right');

        } else if (answers.action === 'Turn left') {
          // find the selected vehicle and turn it left
          selectedVehicle?.turn('left');

        } else if (answers.action === 'Reverse') {
          // find the selected vehicle and reverse it
          selectedVehicle?.reverse();

        } else if (answers.action === 'Tow Vehicle') {
          if (selectedVehicle instanceof Truck) {
            console.log('Towing with truck.');
            this.findVehicleToTow(selectedVehicle);
            return;
          } else {
            console.log('Selected vehicle is not a truck and cannot perform tow action.');
            this.performActions();
          }
        }
        // TODO: add statements to perform the tow action only if the selected vehicle is a truck. Call the findVehicleToTow method to find a vehicle to tow and pass the selected truck as an argument. After calling the findVehicleToTow method, you will need to return to avoid instantly calling the performActions method again since findVehicleToTow is asynchronous.

        // TODO: add statements to perform the wheelie action only if the selected vehicle is a motorbike
        else if (answers.action === 'Wheelie') {
          if (selectedVehicle instanceof Motorbike) {
            selectedVehicle.performWheelie();
            this.performActions();
          } else {
            console.log('Only motorbikes can perform a wheelie.');
            this.performActions();
          }
        }
        else if (answers.action === 'Select or create another vehicle') {
          // start the cli to return to the initial prompt if the user wants to select or create another vehicle
          this.startCli();
          return;
        } else {
          // exit the cli if the user selects exit
          this.exit = true;
        }
        if (!this.exit) {
          // if the user does not want to exit, perform actions on the selected vehicle
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers: { CreateOrSelect: string; }) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;
