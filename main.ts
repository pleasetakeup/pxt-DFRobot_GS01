serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate115200
)
DFRobot_GS01.begin()
basic.forever(function () {
    // serial.writeString("" + (DFRobot_GS01.getFaceNumber()))
    basic.pause(2000)
    if (DFRobot_GS01.getFaceNumber() > 0) {
        basic.pause(100)
        serial.writeString("TYPE:" + DFRobot_GS01.getGestureType())
        serial.writeString("X:" + DFRobot_GS01.getFaceLocationX())
        serial.writeString("Y:" + DFRobot_GS01.getFaceLocationY())
    }
})
