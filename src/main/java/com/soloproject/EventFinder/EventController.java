package com.soloproject.EventFinder;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class EventController {
    public String url = "https://app.ticketmaster.com/discovery/v2/suggest?apikey=SuUqmKq5wDB7PbLtxlPKf1VQBiVA91Bo";
    public String cityURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=";
    public String API = "apikey=SuUqmKq5wDB7PbLtxlPKf1VQBiVA91Bo";
    RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/events")
    public String getEventDetails(){
        return restTemplate.getForObject(this.url, String.class);
    }

    @GetMapping("/submitCity")
    public String submitCity(@RequestParam("CityName") String cityName, Model model){
        String URL = this.cityURL + cityName + "&" + this.API;
        return restTemplate.getForObject(URL, String.class);
    }
}
