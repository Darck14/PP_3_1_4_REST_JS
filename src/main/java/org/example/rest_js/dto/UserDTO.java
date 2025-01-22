package org.example.rest_js.dto;

import java.util.List;

public class UserDTO {

    private Long id;
    private String name;
    private String password;
    private String sername;
    private String sex;
    private List<String> roles;

    public UserDTO() {}


    public UserDTO( Long id, String name, String password, String sername, String sex, List<String> roles) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.sername = sername;
        this.sex = sex;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSername() {
        return sername;
    }

    public void setSername(String sername) {
        this.sername = sername;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", sername='" + sername + '\'' +
                ", sex='" + sex + '\'' +
                ", roles=" + roles +
                '}';
    }
}
