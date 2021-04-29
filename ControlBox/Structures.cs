using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;

public class UsernameBody {
    public string Username { get; set; }
}

public class KeyPressData {
    public string[] KeysToPress { get; set; }
    public int PressDelay { get; set; }
}

public class BalanceEntry {
    public string Username { get; set; }
    public int Balance { get; set; }
}

public class ProgramStorage {
    public IDictionary<string, BalanceEntry> UserData { get; set; }

    public ProgramStorage() {
        UserData = new Dictionary<string, BalanceEntry>();
        var userDataFile = "./UserData.json";

        if (!File.Exists(userDataFile))
            using (StreamWriter w = File.AppendText(userDataFile))
                w.Write("{}");

        using (StreamReader r = new StreamReader(userDataFile))
        {
            var json = r.ReadToEnd();
            var userDataFromJson = JsonConvert.DeserializeObject<Dictionary<string, BalanceEntry>>(json);
            foreach (var keyPair in userDataFromJson) {
                UserData.Add(keyPair.Key, keyPair.Value);
            }
        }
    }

    public void SaveData() {
        var userDataJsonString = JsonConvert.SerializeObject(UserData);
        File.WriteAllText("./UserData.json", userDataJsonString);
    }
}