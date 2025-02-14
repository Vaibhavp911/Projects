package com.project.ems.service;

import com.project.ems.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService{

    // for adding employee details into the table
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    // for retrieving employee by {id}
    EmployeeDto getEmployeeById(Long employeeId);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee);

    void deleteEmployee(Long employeeId);

}
