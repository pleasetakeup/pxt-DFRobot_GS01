serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate115200
)
DFRobot_GS01.begin()
basic.forever(function () {
    DFRobot_GS01.getFaceNumber()
// serial.writeString("" + (DFRobot_GS01.getFaceNumber()))
    basic.pause(1000)
    if (DFRobot_GS01.getFaceNumber() > 0) {
        basic.pause(100)
        serial.writeNumber(DFRobot_GS01.getGestureType())
    }
})
