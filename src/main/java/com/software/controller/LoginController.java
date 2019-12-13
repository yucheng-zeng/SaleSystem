package com.software.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.software.domain.GeneralManager;
import com.software.domain.Staff;
import com.software.domain.StoreManager;
import com.software.domain.SubBranchDetailMap;
import com.software.service.GeneralManagerService;
import com.software.service.StaffService;
import com.software.service.StoreManagerService;
import com.software.service.SubBranchDetailMapService;
import com.software.topservice.LoginManagerService;
import com.software.trans.ReceiveUser;

@RestController
@RequestMapping("/exam")
public class LoginController 
{
	@Autowired
	private LoginManagerService loginService;
	
	@RequestMapping(value = {"/administrator/login","/teacher/login","/student/login"})
	public String login(@RequestBody ReceiveUser param)
	{
		String id = param.getId();
		String password = param.getPassword();
		String authority = param.getType();
		SubBranchDetailMap map = loginService.login(id, password, authority);
	
		return map.getFlag();
	}
}