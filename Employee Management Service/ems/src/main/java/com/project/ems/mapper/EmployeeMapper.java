package com.project.ems.mapper;

import com.project.ems.dto.EmployeeDto;
import com.project.ems.entity.Employee;

public class EmployeeMapper {

    // mapping DTO class to Entity Class
    public static EmployeeDto mapToEmployeeDto(Employee employee){

        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getMobileNo()
        );

    }

    // mapping DTO class to Entity Class
    public static Employee mapToEmployee(EmployeeDto employeeDto){

        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail(),
                employeeDto.getMobileNo()
        );

    }

}
