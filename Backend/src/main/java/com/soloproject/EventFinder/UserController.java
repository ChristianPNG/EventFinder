package com.soloproject.EventFinder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class UserController {
    @Autowired
    private UserRepository UserRepo;
    @Autowired
    EventRepository EventRepo;

    //GET USERS
    @GetMapping("/Users")
    public List<User> listAll() {
        return UserRepo.findAll();
    }

    @PostMapping("/FindUser")
    public User findUser(@RequestBody User user){
        /*
         * Params: User object {id, username, password}
         * Description: Function used when logging in. Get all users with corresponding username, check 
         *      hashed password with the one given,
         *      if password hashings match, return user. If none matched the password was incorrect.
         *      Considered a post mapping to allow request body.
         * Returns: User in database who's username + password match the given (filteredUser)
         *      Null User if nothing matched.
         */
        List<User> users = UserRepo.findAllByUsername(user.getUsername());

        for (User filteredUser : users){
            System.out.println(filteredUser.getPassword());
            if (filteredUser.getPassword().equals(user.getPassword())){
                //get password auto encrypts
                return filteredUser;
            }
        }
        User nullUser = new User();
        return nullUser;

    }

    @PostMapping("/register")
    public void createUser(@RequestBody User user){
        //Expects a user JSON object via a post request. User will be sent to the database
        user.setUsername(user.getUsername());
        user.setPassword(user.getPassword());
        UserRepo.save(user);
    }



    @PostMapping("/saveEvent")
    public void saveEvent(@RequestBody User user, @RequestBody Event event){
        Event curr_event = EventRepo.findById(event.getId());
        if (curr_event == null){
            EventRepo.save(event);
            curr_event = event;
        }
        User curr_user = UserRepo.findById(user.getId());
        if (curr_user.getPassword() != user.getPassword()){
            return;
        }
        curr_event.getUsers().add(curr_user);
        curr_user.getSavedEvents().add(curr_event);
        UserRepo.save(curr_user);
    }
}