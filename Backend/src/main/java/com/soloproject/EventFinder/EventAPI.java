package com.soloproject.EventFinder;

import java.util.ArrayList;
import java.util.HashMap;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class EventAPI {
    public String API = "apikey=SuUqmKq5wDB7PbLtxlPKf1VQBiVA91Bo";
    RestTemplate restTemplate = new RestTemplate();


    @GetMapping("/eventSearch")
    public HashMap<String, ArrayList<String>> eventSearch(@RequestParam(value = "CityName", required = false) String cityName, 
    @RequestParam("page") String page,  @RequestParam(value = "keyword", required = false) String attraction, 
    @RequestParam(value = "attractionId", required = false) String id, Model model){
        String URL = "https://app.ticketmaster.com/discovery/v2/events.json?";
        if (cityName != null){
            URL += "city=" + cityName + "&";
        }
        URL += "size=20&page="+ page;
        if (attraction != null){
            URL += "&keyword=" + attraction;
        }
        if (id != null){
            URL += "&attractionId=" + id;
        }
        URL += "&" + this.API;

        HashMap<String, ArrayList<String>> map = new HashMap<String, ArrayList<String>>();
        String jsonData = restTemplate.getForObject(URL, String.class);
        JSONObject obj = new JSONObject(jsonData);
        JSONArray arr = obj.getJSONObject("_embedded").getJSONArray("events");
        //ArrayList<String>eventURLs = new ArrayList<>();
        for (int i = 0; i<20; i++){
            ArrayList<String> event = new ArrayList<>();
            if (i >= arr.length()){
                break;
            }
            JSONObject dates = arr.getJSONObject(i).getJSONObject("dates");
            event.add(arr.getJSONObject(i).getString("url")); //link 0
            event.add(arr.getJSONObject(i).getJSONArray("images").getJSONObject(0).getString("url")); //img 1

            String event_date[] = dates.getJSONObject("start").getString("localDate").split("-");
            event.add(event_date[1]); //month 2
            event.add(event_date[2]); //day 3

            event.add(dates.getJSONObject("status").getString("code")); //status 4

            JSONObject time = dates.getJSONObject("start");
            if (time.has("localTime")){
                String event_time[] = time.getString("localTime").split(":"); 
                int hour = Integer.valueOf(event_time[0]);
                if (hour > 12){
                    hour = hour - 12;
                    event_time[0] = String.valueOf(hour);
                    event_time[1] += " PM";
                }
                else{
                    event_time[1] += " AM";
                }
                event.add(event_time[0]); //hour 5
                event.add(event_time[1]); //minute 6
            }else{
                event.add(null); //no values 5,6
                event.add(null);
            }

            JSONObject venue = arr.getJSONObject(i).getJSONObject("_embedded").getJSONArray("venues").getJSONObject(0);
            event.add(venue.getString("name")); //venue 7
            event.add(venue.getJSONObject("city").getString("name")); //city 8
            event.add(venue.getJSONObject("state").getString("stateCode")); //state 9
            map.put(arr.getJSONObject(i).getString("name"), event);
        }
        return map;
    }

    @GetMapping("/attractionSearch")
    public HashMap<String, ArrayList<String>> attractionSearch(@RequestParam("keyword") String attraction, 
    @RequestParam("page") String page, Model model){
        String attractionURL = "https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=";
        attractionURL += attraction + "&size=20&page=" + page + "&" + this.API;
        String jsonData = restTemplate.getForObject(attractionURL, String.class);
        JSONObject obj = new JSONObject(jsonData).getJSONObject("_embedded");
        JSONArray arr = obj.getJSONArray("attractions");
        HashMap<String, ArrayList<String>> map = new HashMap<String, ArrayList<String>>();
        for (int i = 0; i<20; i++){
            ArrayList<String> event = new ArrayList<>();
            if (i >= arr.length()){
                break;
            }
            event.add(arr.getJSONObject(i).getString("id"));
            event.add(arr.getJSONObject(i).getJSONArray("images").getJSONObject(0).getString("url"));
            map.put(arr.getJSONObject(i).getString("name"), event);
        }
        return map;

    }

    @GetMapping("/suggestions")
    public HashMap<String, ArrayList<String>> suggestionSearch(Model model){
        String url = "https://app.ticketmaster.com/discovery/v2/suggest?" + this.API;
        String jsonData = restTemplate.getForObject(url, String.class);
        JSONObject obj = new JSONObject(jsonData).getJSONObject("_embedded");
        HashMap<String, ArrayList<String>> map = new HashMap<String, ArrayList<String>>();

        for(String key: obj.keySet()){
            ArrayList<String> event = new ArrayList<>();
            JSONArray arr = obj.getJSONArray(key);
            event.add(arr.getJSONObject(0).getString("name"));
            event.add(arr.getJSONObject(0).getString("url"));
            JSONArray imagesArray = arr.getJSONObject(0).getJSONArray("images");

            int maxWidth = imagesArray.getJSONObject(0).getInt("width");
            String image = imagesArray.getJSONObject(0).getString("url");
            for(int i=1; i<imagesArray.length(); i++){
                JSONObject curr = imagesArray.getJSONObject(i);
                if (curr.getInt("width") > maxWidth){
                    image = curr.getString("url");
                    maxWidth = curr.getInt("width");
                }
            }
            event.add(image);
            map.put(key, event);
        }
        return map;
    }
}
