package com.project.ems.service.impl;

import com.project.ems.dto.EmployeeDto;
import com.project.ems.entity.Employee;
import com.project.ems.exception.ResourceNotFoundException;
import com.project.ems.mapper.EmployeeMapper;
import com.project.ems.repository.EmployeeRepository;
import com.project.ems.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        // converting DTO to Entity by calling Mapper class(which converts DTO to Entity)
        // because values are stored by entity into Database.
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        // saving values into Database
        Employee savedEmployee = employeeRepository.save(employee);
        // Returning saved employee details back to client by converting JPA Entity to DTO
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        // this returns a employee object, because this orElse method returns a Employee object
        // for this take a result in a local variable of type employee.
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with given id = "+employeeId));
        // so method return EmployeeDto so lets convert entity to Dto.
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee) {
        // this returns a employee object, because this orElse method returns a Employee object
        // for this take a result in a local variable of type employee.
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with given id = "+employeeId));

        // getting and setting the data
        employee.setFirstName(updateEmployee.getFirstName());
        employee.setLastName(updateEmployee.getLastName());
        employee.setEmail(updateEmployee.getEmail());
        employee.setMobileNo(updateEmployee.getMobileNo());

        Employee updatedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {

        // this returns a employee object, because this orElse method returns a Employee object
        // for this take a result in a local variable of type employee.
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with given id = "+employeeId));

        employeeRepository.deleteById(employeeId);

    }
}
