using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace ControlBox
{
    class KeySimulate
    {
        public const int KEYEVENTF_EXTENDEDKEY = 0x0001; //Key down flag
        public const int KEYEVENTF_KEYUP = 0x0002; //Key up flag
        public const int VK_RCONTROL = 0xA3; //Right Control key code
        const int VK_F8 = 0x77;

        static public Dictionary<string, Henooh.DeviceEmulator.Native.VirtualKeyCode> HenoohKeyDictionary = new Dictionary<string, Henooh.DeviceEmulator.Native.VirtualKeyCode> {
            { "TAB", Henooh.DeviceEmulator.Native.VirtualKeyCode.TAB },
            { "RETURN", Henooh.DeviceEmulator.Native.VirtualKeyCode.RETURN },
            { "ESCAPE", Henooh.DeviceEmulator.Native.VirtualKeyCode.ESCAPE },
            { "SPACE", Henooh.DeviceEmulator.Native.VirtualKeyCode.SPACE },
            { "END", Henooh.DeviceEmulator.Native.VirtualKeyCode.END },
            { "HOME", Henooh.DeviceEmulator.Native.VirtualKeyCode.HOME },
            { "LEFT", Henooh.DeviceEmulator.Native.VirtualKeyCode.LEFT },
            { "UP", Henooh.DeviceEmulator.Native.VirtualKeyCode.UP },
            { "RIGHT", Henooh.DeviceEmulator.Native.VirtualKeyCode.RIGHT },
            { "DOWN", Henooh.DeviceEmulator.Native.VirtualKeyCode.DOWN },
            { "INSERT", Henooh.DeviceEmulator.Native.VirtualKeyCode.INSERT },
            { "DELETE", Henooh.DeviceEmulator.Native.VirtualKeyCode.DELETE },
            { "0", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_0 },
            { "1", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_1 },
            { "2", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_2 },
            { "3", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_3 },
            { "4", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_4 },
            { "5", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_5 },
            { "6", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_6 },
            { "7", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_7 },
            { "8", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_8 },
            { "9", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_9 },
            { "A", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_A },
            { "B", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_B },
            { "C", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_C },
            { "D", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_D },
            { "E", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_E },
            { "F", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_F },
            { "G", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_G },
            { "H", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_H },
            { "I", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_I },
            { "J", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_J },
            { "K", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_K },
            { "L", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_L },
            { "M", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_M },
            { "N", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_N },
            { "O", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_O },
            { "P", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_P },
            { "Q", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_Q },
            { "R", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_R },
            { "S", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_S },
            { "T", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_T },
            { "U", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_U },
            { "V", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_V },
            { "W", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_W },
            { "X", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_X },
            { "Y", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_Y },
            { "Z", Henooh.DeviceEmulator.Native.VirtualKeyCode.VK_Z },
            { "LEFT WINDOWS", Henooh.DeviceEmulator.Native.VirtualKeyCode.LWIN },
            { "RIGHT WINDOWS", Henooh.DeviceEmulator.Native.VirtualKeyCode.RWIN },
            { "NUMPAD 0", Henooh.DeviceEmulator.Native.VirtualKeyCode.NUMPAD0 },
            { "NUMPAD 1", Henooh.DeviceEmulator.Native.VirtualKeyCode.NUMPAD1 },
            { "NUMPAD 2", Henooh.DeviceEmulator.Native.VirtualKeyCode.NUMPAD2 },
            { "NUMPAD 3", Henooh.DeviceEmulator.Native.VirtualKeyCode.NUMPAD3 },
            { "NUMPAD 4", Henooh.DeviceEmulator.Native.VirtualKeyCode.NUMPAD4 },
            { "NUMPAD 5", Henooh.DeviceEmulator.Native.VirtualKeyCode.NUMPAD5 },
            { "NUMPAD 6", Henooh.DeviceEmulator.Native.VirtualKeyCode.NUMPAD6 },
            { "NUMPAD 7", Henooh.DeviceEmulator.Native.VirtualKeyCode.NUMPAD7 },
            { "NUMPAD 8", Henooh.DeviceEmulator.Native.VirtualKeyCode.NUMPAD8 },
            { "NUMPAD 9", Henooh.DeviceEmulator.Native.VirtualKeyCode.NUMPAD9 },
            { "MULTIPLY", Henooh.DeviceEmulator.Native.VirtualKeyCode.MULTIPLY },
            { "ADD", Henooh.DeviceEmulator.Native.VirtualKeyCode.ADD },
            { "DECIMAL", Henooh.DeviceEmulator.Native.VirtualKeyCode.DECIMAL },
            { "DIVIDE", Henooh.DeviceEmulator.Native.VirtualKeyCode.DIVIDE },
            { "F1", Henooh.DeviceEmulator.Native.VirtualKeyCode.F1 },
            { "F2", Henooh.DeviceEmulator.Native.VirtualKeyCode.F2 },
            { "F3", Henooh.DeviceEmulator.Native.VirtualKeyCode.F3 },
            { "F4", Henooh.DeviceEmulator.Native.VirtualKeyCode.F4 },
            { "F5", Henooh.DeviceEmulator.Native.VirtualKeyCode.F5 },
            { "F6", Henooh.DeviceEmulator.Native.VirtualKeyCode.F6 },
            { "F7", Henooh.DeviceEmulator.Native.VirtualKeyCode.F7 },
            { "F8", Henooh.DeviceEmulator.Native.VirtualKeyCode.F8 },
            { "F9", Henooh.DeviceEmulator.Native.VirtualKeyCode.F9 },
            { "F10", Henooh.DeviceEmulator.Native.VirtualKeyCode.F10 },
            { "F11", Henooh.DeviceEmulator.Native.VirtualKeyCode.F11 },
            { "F12", Henooh.DeviceEmulator.Native.VirtualKeyCode.F12 },
            { "NUMLOCK", Henooh.DeviceEmulator.Native.VirtualKeyCode.NUMLOCK },
            { "LEFT SHIFT", Henooh.DeviceEmulator.Native.VirtualKeyCode.LSHIFT },
            { "RIGHT SHIFT", Henooh.DeviceEmulator.Native.VirtualKeyCode.RSHIFT },
            { "LEFT CONTROL", Henooh.DeviceEmulator.Native.VirtualKeyCode.LCONTROL },
            { "RIGHT CONTROL", Henooh.DeviceEmulator.Native.VirtualKeyCode.RCONTROL },
        };

        static public Dictionary<string, byte> KeyDictionary = new Dictionary<string, byte> {
            { "TAB", 0x09 },
            { "RETURN", 0x0D },
            { "ESCAPE", 0x1B },
            { "SPACE", 0x20 },
            { "END", 0x23 },
            { "HOME", 0x24 },
            { "LEFT", 0x25 },
            { "UP", 0x26 },
            { "RIGHT", 0x27 },
            { "DOWN", 0x28 },
            { "INSERT", 0x2D },
            { "DELETE", 0x2E },
            { "0", 0x30 },
            { "1", 0x31 },
            { "2", 0x32 },
            { "3", 0x33 },
            { "4", 0x34 },
            { "5", 0x35 },
            { "6", 0x36 },
            { "7", 0x37 },
            { "8", 0x38 },
            { "9", 0x39 },
            { "A", 0x41 },
            { "B", 0x42 },
            { "C", 0x43 },
            { "D", 0x44 },
            { "E", 0x45 },
            { "F", 0x46 },
            { "G", 0x47 },
            { "H", 0x48 },
            { "I", 0x49 },
            { "J", 0x4A },
            { "K", 0x4B },
            { "L", 0x4C },
            { "M", 0x4D },
            { "N", 0x4E },
            { "O", 0x4F },
            { "P", 0x50 },
            { "Q", 0x51 },
            { "R", 0x52 },
            { "S", 0x53 },
            { "T", 0x54 },
            { "U", 0x55 },
            { "V", 0x56 },
            { "W", 0x57 },
            { "X", 0x58 },
            { "Y", 0x59 },
            { "Z", 0x5A },
            { "LEFT WINDOWS", 0x5B },
            { "RIGHT WINDOWS", 0x5C },
            { "NUMPAD 0", 0x60 },
            { "NUMPAD 1", 0x61 },
            { "NUMPAD 2", 0x62 },
            { "NUMPAD 3", 0x63 },
            { "NUMPAD 4", 0x64 },
            { "NUMPAD 5", 0x65 },
            { "NUMPAD 6", 0x66 },
            { "NUMPAD 7", 0x67 },
            { "NUMPAD 8", 0x68 },
            { "NUMPAD 9", 0x69 },
            { "MULTIPLY", 0x6A },
            { "ADD", 0x6B },
            { "DECIMAL", 0x6E },
            { "DIVIDE", 0x6F },
            { "F1", 0x70 },
            { "F2", 0x71 },
            { "F3", 0x72 },
            { "F4", 0x73 },
            { "F5", 0x74 },
            { "F6", 0x75 },
            { "F7", 0x76 },
            { "F8", 0x77 },
            { "F9", 0x78 },
            { "F10", 0x79 },
            { "F11", 0x7A },
            { "F12", 0x7B },
            { "NUMLOCK", 0x90 },
            { "LEFT SHIFT", 0xA0 },
            { "RIGHT SHIFT", 0xA1 },
            { "LEFT CONTROL", 0xA2 },
            { "RIGHT CONTROL", 0xA3 },
        };

        [DllImport("user32.dll", SetLastError = true)]
        static extern void keybd_event(byte bVk, byte bScan, int dwFlags, int dwExtraInfo); 

        public static bool KeySimulateTap(string[] keyIDs) {
            string[] keysSeparated = keyIDs[0].Split(",");
            for (var i = 0; i < keysSeparated.Length; ++i) {
                if (!KeyDictionary.ContainsKey(keysSeparated[i])) { Console.WriteLine("ERROR"); return false; }
                Console.WriteLine("Simulating key: " + keysSeparated[i]);
                keybd_event(KeyDictionary[keysSeparated[i]], 0, KEYEVENTF_EXTENDEDKEY, 0);
            }

            
            for (var i = 0; i < keysSeparated.Length; ++i)
            {
                if (!KeyDictionary.ContainsKey(keysSeparated[i])) { Console.WriteLine("ERROR"); return false; }
                keybd_event(KeyDictionary[keysSeparated[i]], 0, KEYEVENTF_KEYUP, 0);
            }

            
            for (var i = 0; i < keysSeparated.Length; ++i) {
                if (!HenoohKeyDictionary.ContainsKey(keysSeparated[i])) { Console.WriteLine("ERROR"); return false; }
                var keyboardController = new Henooh.DeviceEmulator.KeyboardController();
                keyboardController.Control(HenoohKeyDictionary[keysSeparated[i]]);
            }
            
            return true;
        }
    }
}