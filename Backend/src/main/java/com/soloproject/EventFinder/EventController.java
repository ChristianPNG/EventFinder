package com.soloproject.EventFinder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class EventController {
    @Autowired
    private EventRepository EventRepo;

    @GetMapping("/getEvent/{name}")
    public Event getEvent(@PathVariable(value="name") String eventName){
        Event foundEvent = EventRepo.findByName(eventName);
        if (foundEvent == null){
            Event nullEvent = new Event();
            return nullEvent;
        }
        return foundEvent;
    } 
    
}