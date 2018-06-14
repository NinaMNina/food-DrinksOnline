package jsonData;

import java.io.File;
import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.DeserializationFeature;

public class JsonSerializer {
	public static Data loadData() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.WRAP_EXCEPTIONS, true);
        Data f = null;
        String path = (System.getProperty("user.dir")+"/data.json");
        System.out.println(path);
        try {
            path = path.replace('\\', '/');
            f = (Data)mapper.readValue(new File(path), Data.class);
        } catch (IOException var5) {
            f = null;
        }
        return f;
    }
	public static void saveData() {
		 ObjectMapper mapper = new ObjectMapper();
	     String path = (System.getProperty("user.dir")+"/data.json");
	     try {
            File file = new File(path);
            file.delete();
        } catch (Exception e) {
            
        }

        try {
            mapper.writeValue(new File(path), Data.getInstance());
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }
    }
}
