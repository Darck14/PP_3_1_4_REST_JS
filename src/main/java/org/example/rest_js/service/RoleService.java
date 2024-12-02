package org.example.rest_js.service;

import org.example.rest_js.model.Role;

import java.util.List;

public interface RoleService {

    void addRole(Role role);

    void updateRole(Role role);

    void deleteRoleById(int id);

    Role getRoleById(int id);

    List<Role> getAllRoles();

    Role getRoleByName(String name);
}
