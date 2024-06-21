package com.soloproject.EventFinder;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;

import org.json.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class EventController {
    public String API = "apikey=SuUqmKq5wDB7PbLtxlPKf1VQBiVA91Bo";
    RestTemplate restTemplate = new RestTemplate();


    @GetMapping("/submitCity")
    public HashMap<String, ArrayList<String>> submitCity(@RequestParam("CityName") String cityName, 
    @RequestParam("page") String page,  @RequestParam("keyword") String attraction, Model model){
        String cityURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=";
        System.out.println(page);
        String URL = cityURL + cityName + "&size=20&page="+ page + "&keyword=" + attraction + "&" + this.API;
        String jsonData = restTemplate.getForObject(URL, String.class);
        JSONObject obj = new JSONObject(jsonData).getJSONObject("_embedded");
        JSONArray arr = obj.getJSONArray("events");
        HashMap<String, ArrayList<String>> map = new HashMap<String, ArrayList<String>>();

        //ArrayList<String> eventURLs = new ArrayList<>();
        for (int i = 0; i<20; i++){
            ArrayList<String> event = new ArrayList<>();
            if (i >= arr.length()){
                break;
            }
            event.add(arr.getJSONObject(i).getString("url"));
            event.add(arr.getJSONObject(i).getJSONArray("images").getJSONObject(0).getString("url"));
            map.put(arr.getJSONObject(i).getString("name"), event);
        }
        return map;
    }
}
