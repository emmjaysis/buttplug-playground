import { ButtplugClient, ButtplugMessage, Device, Log, ButtplugDeviceMessage, StopAllDevices,
         SingleMotorVibrateCmd } from "buttplug";
import Vue from "vue";
import "vue-awesome/icons/bars";
import { Component, Model } from "vue-property-decorator";
import VibrationComponent from "./components/VibrationComponent/VibrationComponent";
import PositionComponent from "./components/PositionComponent/PositionComponent";
import RotationComponent from "./components/RotationComponent/RotationComponent";

@Component({
  components: {
    VibrationComponent,
    PositionComponent,
    RotationComponent,
  },
})
export default class App extends Vue {
  private hasOpenedMenu: boolean = false;
  private devices: Device[] = [];
  private vibratingDevices: Device[] = [];
  private launchDevices: Map<number, Device> = new Map<number, Device>();
  private isDragging: boolean = false;

  private SideNavOpen() {
    if (this.isDragging) {
      return;
    }
    if (!this.hasOpenedMenu) {
      this.hasOpenedMenu = true;
    }
    (this.$refs.leftSideNav as any).open();
  }

  private SideNavClose() {
    if (this.isDragging) {
      return;
    }
    (this.$refs.leftSideNav as any).close();
  }

  private ToggleLeftSideNav() {
    if (!this.hasOpenedMenu) {
      this.hasOpenedMenu = true;
    }
    (this.$refs.leftSideNav as any).toggle();
  }

  private OnDeviceConnected(aDevice: Device) {
    this.devices.push(aDevice);
  }

  private OnDeviceDisconnected(aDevice: Device) {
    this.devices = this.devices.filter((device) => device.Index !== aDevice.Index);
  }

  private async OnDeviceMessage(aDevice: Device, aMessage: ButtplugDeviceMessage) {
    (Vue as any).Buttplug.SendDeviceMessage(aDevice, aMessage);
  }

  private OnDragStart() {
    this.isDragging = true;
  }

  private OnDragStop() {
    this.isDragging = false;
  }
}
