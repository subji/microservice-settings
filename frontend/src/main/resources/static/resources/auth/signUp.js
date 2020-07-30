

	// 체크되어야 하는 값
	CHECK_STATUS = $.extend(CHECK_STATUS,{
		nicknameInput : {
			value : false,
			announcement : "닉네임을 입력해주세요.",
			selector : ".error_info[data-what=nickname]",
			beforeFunction : function(){
				$(CHECK_STATUS.nicknameInput.selector).html(''+ CHECK_STATUS.nicknameInput.announcement);
				CHECK_STATUS.nicknameInput.value = CHECK_FUNCTION.nicknameInput();
				return true;
			},
			showAnnoncement : function(){
				$(CHECK_STATUS.nicknameInput.selector).show();
				$(CHECK_STATUS.nicknameInput.selector).html(''+ CHECK_STATUS.nicknameInput.announcement);
			},
			hideAnnonecement : function(){
				$(CHECK_STATUS.nicknameInput.selector).hide();
			}
		},
		nicknameReg : {
			value : false,
			announcement : "닉네임은 한글, 영문, 숫자만 가능합니다. (최소 3자~최대 10자)",
			selector : ".error_info[data-what=nickname]",
			beforeFunction : function(){
				$(CHECK_STATUS.nicknameReg.selector).html(''+ CHECK_STATUS.nicknameReg.announcement);
				CHECK_STATUS.nicknameReg.value = CHECK_FUNCTION.nicknameReg();
				return true;
			},
			showAnnoncement : function(){
				$(CHECK_STATUS.nicknameReg.selector).show();
				$(CHECK_STATUS.nicknameReg.selector).html(''+ CHECK_STATUS.nicknameReg.announcement);
			},
			hideAnnonecement : function(){
				$(CHECK_STATUS.nicknameReg.selector).hide();
			}
		},
		
		nickname : {
			value : false,
			announcement : "닉네임 중복 검사를 해주세요.",
			selector : ".error_info[data-what=nickname]",
			beforeFunction : function(){
				$("#signUpForm > p[data-what=nickname]").html('닉네임 중복 검사를 해주세요.');
				return true;
			},
			showAnnoncement : function(){
				$(CHECK_STATUS.nickname.selector).show();
				$(CHECK_STATUS.nickname.selector).html(''+ CHECK_STATUS.nickname.announcement);
			},
			hideAnnonecement : function(){
				$(CHECK_STATUS.nickname.selector).hide();
			}
		},
		banNickname : {
			value : false,
			announcement : "해당 닉네임은 사용할 수 없습니다.",
			beforeFunction : function(){
				if(!banProhibitWord(banNicknameReg,$("#userNickname").val())){
					CHECK_STATUS.banNickname.value = true;
					return true;
				}
				return false;
			},
			showAnnoncement : function(){
				$(CHECK_STATUS.banNickname.selector).show();
				$(CHECK_STATUS.banNickname.selector).html(''+ CHECK_STATUS.banNickname.announcement);
			},
			hideAnnonecement : function(){
				$(CHECK_STATUS.banNickname.selector).hide();
			}
		},
		joinPath : {
			value : false,
			announcement : "가입 경로를 선택해주세요.",
			selector : ".error_info[data-what=joinPath]",
			beforeFunction : function(){
				
				if($("input[name=joinPath]:checked").length == 0 ){
					CHECK_STATUS.joinPath.announcement = "가입 경로를 선택해주세요.";
					CHECK_STATUS.joinPath.value = false;
					return false;
				}
				

				if($("input[name=joinPath]:checked").val() >= 1000 ){
					if($("#joinPathEtcText").val().length == 0 ){
						CHECK_STATUS.joinPath.announcement = "기타 내용을 입력해주세요.";
						CHECK_STATUS.joinPath.value = false;
						return false;
					}
					
					if($("#joinPathEtcText").val().length < 2 || $("#joinPathEtcText").val().length > 30 ){
						CHECK_STATUS.joinPath.announcement = "기타 내용은 2자에서 30자 이내로 입력해주세요.";
						CHECK_STATUS.joinPath.value = false;
						return false;
					}
				}
				
				
				CHECK_STATUS.joinPath.value = true;
				return true;
			},
			showAnnoncement : function(){
				$(CHECK_STATUS.joinPath.selector).show();
				$(CHECK_STATUS.joinPath.selector).html(''+ CHECK_STATUS.joinPath.announcement);
			},
			hideAnnonecement : function(){
				$(CHECK_STATUS.joinPath.selector).hide();
			}
		},
		
		serviceTermsStatus : {
			value : false,
			announcement : "서비스 이용약관에 동의를 하셔야 회원가입이 가능합니다.",
			beforeFunction : function(){
				CHECK_STATUS.serviceTermsStatus.value = $("#serviceTermsStatus").is(":checked");
				return true;
			},showAnnoncement : function(){
				showAlert(CHECK_STATUS.serviceTermsStatus.announcement);
			},
			hideAnnonecement : function(){
				
			}
		},
		privacyStatementStatus : {
			value : false,
			announcement : "개인정보 수집 및 이용에 동의를 하셔야 회원가입이 가능합니다.",
			beforeFunction : function(){
				CHECK_STATUS.privacyStatementStatus.value = $("#privacyStatementStatus").is(":checked");
				return true;
			},showAnnoncement : function(){
				showAlert(CHECK_STATUS.privacyStatementStatus.announcement);
			},
			hideAnnonecement : function(){
				
			}
		}
		
	});
	
	


// 체크된 당시 닉네임
	var CHECKED_NICKNAME = null;
	var banNicknameReg = getProhibitWord({"type":"NICKNAME"});
	
	$(function() {
		//닉네임 값 변경되면
		$("#userNickname").on("propertychange change keyup paste input",function(e){
			CHECK_STATUS.nicknameInput.hideAnnonecement();
			CHECK_STATUS.nickname.value = false;		
			CHECKED_NICKNAME = null;
		});
		
		//동의 여부 체크
		$('input.statusCheckBox').not("input[name=emailReceivingStatus]").change(function(e) {
		    CHECK_STATUS[$(this).attr("name")].value = $(this).is(":checked");
		});
		
		
		$("#emailDomainOption").on("change",function(e){

			$("#userEmailDomain").val($("#emailDomainOption option:selected").val());
			$("#userEmailDomain").attr("disabled",$("#emailDomainOption option:selected").data("disabled") );
			
			
			
			CHECK_STATUS.email.value = false;
			CHECKED_EMAIL = null;
			$("#userEmail, #userId").val($("#userEmailId").val() + "@" + $("#userEmailDomain").val());
			
		})
		
		
	});
	
	/**
	 * 전체 동의하기 
	 * @returns
	 */
	function changeCheckboxStatus(){
		
		if($("#signUpForm > ul input[type=checkbox]").prop("checked")){
			$("#signUpForm > ul input[type=checkbox]").prop("checked",false);
			CHECK_STATUS.serviceTermsStatus.value = false;
			CHECK_STATUS.privacyStatementStatus.value = false;
			
		} else {
			$("#signUpForm > ul input[type=checkbox]").prop("checked",true);
			CHECK_STATUS.serviceTermsStatus.value = true;
			CHECK_STATUS.privacyStatementStatus.value = true;
		}
	}
	
	/**
	* 이메일 정규식 체크
	*/
	function checkEmailRegExp(){
		
		option = {}
		option.regExp = EMAIL_REGEXP;
		option.str = $("#userEmail").val();
		option.msg = "사용할 수 없는 이메일입니다."
		
		return checkRegExp(option);
		
	}
	
	
	/**
	* 비밀번호 정규식 체크
	*/
	function checkPasswordRegExp(){
		option = {}
		option.regExp = PASSWORD_REGEXP;
		option.str = $("#userPassword").val();
		option.msg = "비밀번호는 8자에서 16자 (영문, 숫자, 특수문자 각 1자리 이상)";
		
		return checkRegExp(option);
	}
	
	/**
	* 비밀번호 정규식 체크
	*/
	function checkPasswordConfirmRegExp(){
		option = {}
		option.regExp = PASSWORD_REGEXP;
		option.str = $("#userPasswordConfirm").val();
		option.msg = "비밀번호는 8자에서 16자 (영문, 숫자, 특수문자 각 1자리 이상)";
		
		return checkRegExp(option);
	}
	
	
	
	/**
	* 닉네임 정규식 체크
	*/
	function checkNicknameRegExp(){
		let option = {}
		option.regExp = NICKNAME_REGEXP;
		option.str = $("#userNickname").val();
		option.msg = "한글, 영문, 숫자만 가능합니다.(3~10자)"
		
		return checkRegExp(option);
	}
	
	/**
	* 비번 & 비번확인 일치 여부 판단
	*/
	function checkPassword(){
		
		let userPassword = $("#userPassword").val();
		let userPasswordConfirm = $("#userPasswordConfirm").val(); 
		
		//비밀번호 & 비밀번호 확인 일치 안하면
		if(userPassword !== userPasswordConfirm){
			showAlert("비밀번호가 일치하지 않습니다.");
			return false;
		}
		
		return true;	
		
	}
	
	
	
	
	/**
	* 닉네임 중복 체크
	*/

	function checkDuplicateNickname(){
		
		if(!CHECK_FUNCTION.nicknameInput()){
			$(CHECK_STATUS.nicknameInput.selector).show("");
			$(CHECK_STATUS.nicknameInput.selector).html((''+ CHECK_STATUS.nicknameInput.announcement));
		    
			return;
		}
		
		
		let userNickname = $("#userNickname").val();
		if (banProhibitWord(banNicknameReg, userNickname)) {
//			showAlert(CHECK_STATUS.banNickname.announcement);
			$(CHECK_STATUS.nickname.selector).show("");
			$(CHECK_STATUS.nickname.selector).html((''+ CHECK_STATUS.banNickname.announcement));
    
			CHECK_STATUS.banNickname.value = false;
			return ;
		} else {
			CHECK_STATUS.banNickname.value = true;
		}
		
		
		
		
		//닉네임 정규 표현식 체크
		if(CHECK_FUNCTION.nicknameReg()){
			
			$.ajax({
			    url : "/auth/hasSameNickname.json", 
			    type : 'GET', 
			    data : {"userNickname" : userNickname}, 
			    async: false,
			    success : function(response) {
			    	
			    	if(response.code == "00"){
			    		if(response.data !== "false"){
//			    			showAlert("이미 사용중인 닉네임입니다.");
			    			$(CHECK_STATUS.nickname.selector).show("");
			    			$("#signUpForm > p[data-what=nickname]").html('이미 사용중인 닉네임입니다.');
				    	} else {

			    			$(CHECK_STATUS.nickname.selector).hide("");
			    			showAlert("사용 가능한 닉네임입니다.");
				    		CHECKED_NICKNAME = userNickname;
				    		CHECK_STATUS.nickname.value = true;
		// 		    		$("#userNickname").prop("disabled",true);
				    	}    		
			    	}else{
			    		$(CHECK_STATUS.nickname.selector).show("");
		    			$("#signUpForm > p[data-what=nickname]").html('이미 사용중인 닉네임입니다.');
			    	}
			    }, 
			    error : function(xhr, status) {
					console.log(xhr);
					showAlert(ERROR_MSG);	
			    }
			}); 
		} else {
			CHECK_STATUS.nicknameReg.showAnnoncement();
		}
		
	}
	
	
	/**
	* 이메일 중복 체크
	*/
	function checkDuplicateEmail(){
		let userEmail = $("#userEmail").val();
		if($("#userEmailId").val().length == 0 || $("#userEmailDomain").val().length == 0){
			$(".error_info[data-what=email]").html('이메일을 입력해주세요.');
			$(".error_info[data-what=email]").show();
			return false;
		}
		
		//이메일 정규 표현식 체크
		if(CHECK_FUNCTION.emailReg()){
			$.ajax({
			    url : "/auth/hasSameEmail.json", 
			    type : 'GET', 
			    data : {"userEmail" : userEmail}, 
			    async: false,
			    success : function(response) {
			    	if(response.code == "00"){
			    		if(response.data !== "false"){
// 			    			alert("이미 사용중인 이메일입니다.");
				    		$(CHECK_STATUS.email.selector).html(''+"이미 사용중인 이메일 입니다.");	
				    		$(CHECK_STATUS.email.selector).show();	
			    		
			    		} else {
			    			showAlert("사용 가능한 이메일입니다.");
				    		CHECK_STATUS.email.hideAnnonecement();
				    		CHECKED_EMAIL = userEmail;
				    		CHECK_STATUS.email.value = true;
				    		
				    		
				    	}    		
			    	}else{
			    		$(CHECK_STATUS.email.selector).html(''+response.message);	
			    		$(CHECK_STATUS.email.selector).show();	
			    	}
			    }, 
			    error : function(xhr, status) {
					console.log(xhr);
					showAlert(ERROR_MSG);	
			    }
			}); 
		} else {
			$("p[data-what=email]").show();	
			$("p[data-what=email]").html(''+"사용할 수 없는 이메일입니다.");	
		}
	};


	//아코디언 메뉴 열기
	function setToggle(obj){
		$(obj).toggleClass("on");
		$(obj).parent().next().toggleClass("on");
	}