
/**
* 使用此文件来定义自定义函数和图形块。
* 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
*/

// GS01 Configuration Register Addresses
let REG_GS01_ADDR = 0x00  ///< Device address register
let REG_GS01_BAUDRATE = 0x01  ///< Baud rate configuration register
let REG_GS01_VERIFY_AND_STOP = 0x02  ///< Parity and stop bits configuration register
let REG_GS01_FACE_THRESHOLD = 0x03  ///< Face detection threshold, X coordinate
let REG_GS01_FACE_SCORE_THRESHOLD = 0x04  ///< Face score threshold
let REG_GS01_GESTURE_SCORE_THRESHOLD = 0x05 ///< Gesture score threshold

// GS01 Data Register Addresses
let REG_GS01_PID = 0x00  ///< Product ID register
let REG_GS01_VID = 0x01  ///< Vendor ID register
let REG_GS01_HW_VERSION = 0x02  ///< Hardware version register
let REG_GS01_SW_VERSION = 0x03  ///< Software version register
let REG_GS01_FACE_NUMBER = 0x04  ///< Number of detected faces
let REG_GS01_FACE_LOCATION_X = 0x05  ///< Face X coordinate
let REG_GS01_FACE_LOCATION_Y = 0x06  ///< Face Y coordinate
let REG_GS01_FACE_SCORE = 0x07  ///< Face score
let REG_GS01_GESTURE_TYPE = 0x08  ///< Gesture type
let REG_GS01_GESTURE_SCORE = 0x09  ///< Gesture score

let INPUT_REG_OFFSET = 0x06  ///< Input register offset

let _addr = 0x72





/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="Ã"
namespace DFRobot_GS01 {
    /**
     * @brief Enumeration for UART parity configuration.
     */
    export enum ParityConfig {
        UART_CFG_PARITY_NONE = 0,  ///< No parity
        UART_CFG_PARITY_ODD = 1,       ///< Odd parity
        UART_CFG_PARITY_EVEN = 2,      ///< Even parity
        UART_CFG_PARITY_MARK = 3,      ///< Mark parity
        UART_CFG_PARITY_SPACE = 4,     ///< Space parity
    }

    export enum BaudConfig {
        //% block="eBaud_1200"
        Baud_1200 = 1,     ///< Baud rate 1200
        //% block="eBaud_2400"
        Baud_2400 = 2,         ///< Baud rate 2400
        Baud_4800 = 3,         ///< Baud rate 4800
        Baud_9600 = 4,         ///< Baud rate 9600
        Baud_14400 = 5,        ///< Baud rate 14400
        Baud_19200 = 6,        ///< Baud rate 19200
        Baud_38400 = 7,        ///< Baud rate 38400
        Baud_57600 = 8,        ///< Baud rate 57600
        Baud_115200 = 9,       ///< Baud rate 115200
        Baud_230400 = 10,       ///< Baud rate 230400
        Baud_460800 = 11,       ///< Baud rate 460800
        Baud_921600 = 12,       ///< Baud rate 921600
    }



    /**
     * @brief Enumeration for UART stop bits configuration.
     */
    export enum Stopbits {
        UART_CFG_STOP_BITS_0_5 = 0, ///< 0.5 stop bits
        UART_CFG_STOP_BITS_1 = 1,       ///< 1 stop bit
        UART_CFG_STOP_BITS_1_5 = 2,     ///< 1.5 stop bits
        UART_CFG_STOP_BITS_2 = 3,       ///< 2 stop bits
    }


    export function functionconfigUart(baud: BaudConfig, parity: ParityConfig, stopBit: Stopbits): number {

        let verifyAndStop = (parity << 8) | (stopBit & 0xff);

        writeIHoldingReg(REG_GS01_BAUDRATE, baud)
        writeIHoldingReg(REG_GS01_VERIFY_AND_STOP, verifyAndStop)
        return 1
    }
    /**
     * TODO: describe your function here
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "Hello"
     * @param e describe parameter here
     */
    export function setFaceDetectThres(score: number): boolean {



        return writeIHoldingReg(REG_GS01_FACE_SCORE_THRESHOLD, score)
    }

    export function setDetectThres(x: number): boolean {
        return writeIHoldingReg(REG_GS01_FACE_THRESHOLD, x)
    }

    export function setGestureDetectThres(score: number): boolean {

        return writeIHoldingReg(REG_GS01_GESTURE_SCORE_THRESHOLD, score)

    }
    //% block
    export function begin(addr: number): void {
        _addr = addr
    }


    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    export function getGs01Pid(): number {

        return reaInputdReg(REG_GS01_PID)
    }

    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    export function getGs01Vid(): number {

        return reaInputdReg(REG_GS01_VID)
    }
    /**
     * TODO: Get the number of faces
     */
    //% block
    export function getFaceNumber(): number {

        return reaInputdReg(REG_GS01_FACE_NUMBER)
    }

    /**
     * TODO: Get face X-coordinate
     */
    //% block
    export function getFaceLocationX(): number {

        return reaInputdReg(REG_GS01_FACE_LOCATION_X)
    }
    /**
     * TODO: Get face Y-coordinate
     */
    //% block
    export function getFaceLocationY(): number {

        return reaInputdReg(REG_GS01_FACE_LOCATION_Y)
    }

    export function getFaceScore(): number {

        return reaInputdReg(REG_GS01_FACE_SCORE)
    }
    /**
     * TODO: Get gesture type
     */
    //% block
    export function getGestureType(): number {

        return reaInputdReg(REG_GS01_GESTURE_TYPE)
    }
    export function getGestureScore(): number {

        return reaInputdReg(REG_GS01_GESTURE_SCORE)
    }




    export function readReg(reg: number): number {


        let sendBuffer = pins.createBuffer(6)

        sendBuffer[0] = reg >> 8
        sendBuffer[1] = reg & 0xff

        pins.i2cWriteBuffer(_addr, sendBuffer)
        basic.pause(50)//10 ms
        let lenBuf = pins.i2cReadBuffer(_addr, 2)
        let value = lenBuf[1] << 8 | lenBuf[0]
        return value
    }

    export function wirteReg(reg: number, data: number): boolean {
        let sendBuffer = pins.createBuffer(6)
        sendBuffer[0] = reg >> 8
        sendBuffer[1] = reg & 0xff
        sendBuffer[2] = data >> 8
        sendBuffer[3] = data & 0xff
        pins.i2cWriteBuffer(_addr, sendBuffer)
        return true
    }
    export function writeIHoldingReg(reg: number, data: number): boolean {


        return wirteReg(reg, data)
    }
    export function reaInputdReg(reg: number): number {
        return readReg(INPUT_REG_OFFSET + reg)
    }
    export function readHoldingReg(reg: number): number {
        return readReg(reg)
    }


}