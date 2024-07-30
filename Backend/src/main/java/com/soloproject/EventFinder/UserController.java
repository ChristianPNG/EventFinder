package com.soloproject.EventFinder;

import org.apache.commons.codec.digest.DigestUtils;
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

    //GET USERS
    @GetMapping("/Users")
    public List<User> listAll() {
        return UserRepo.findAll();
    }

    @GetMapping("/FindUser")
    public User findUser(@RequestBody User user){
        /*
         * Params: User object {id, username, password}
         * Description: Get all users with corresponding username, check hashed password with the one given
         *      if password hashings match, return user. If none matched the password was incorrect
         * Returns: User in database who's username + password match the given (filteredUser)
         *      Null User if nothing matched.
         */
        List<User> users = UserRepo.findAllByUsername(user.getUsername());
        String encodedPass = DigestUtils.sha256Hex(user.getPassword()); //64 length

        for (User filteredUser : users){
            if (filteredUser.getPassword() == encodedPass){
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
}