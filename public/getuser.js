function saveUser() {
    const userData = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      mobileNo: $('#mobileNo').val(),
      email: $('#email').val(),
      street: $('#street').val(),
      city: $('#city').val(),
      state: $('#state').val(),
      country: $('#country').val(),
      loginId: $('#loginId').val(),
      password: $('#password').val(),
    };

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/api/saveUser',
      contentType: 'application/json',
      data: JSON.stringify(userData),
      success: function(response) {
        alert('User saved successfully!');
      },
      error: function(error) {
        console.error(error);
        alert('Error saving user.');
      },
    });
  }

  $(document).ready(function() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/api/getUsers',
      success: function(users) {
        const userList = $('#userList');
        userList.empty();

        users.forEach(function(user) {
          userList.append(`<p>${user.firstName} ${user.lastName}</p>`);
        });
        const userListTable = $('#userTable tbody');
                  userListTable.empty();
        users.forEach(function(user) {
                      userListTable.append(`
                          <tr>
                              <td>${user.firstName}</td>
                              <td>${user.lastName}</td>
                              <td>${user.mobileNo}</td>
                              <td>${user.email}</td>
                              <td>${user.street}</td>
                              <td>${user.city}</td>
                              <td>${user.state}</td>
                              <td>${user.country}</td>
                              <td>${user.loginId}</td>
                          </tr>
                      `);
                  });
      },
      error: function(error) {
        console.log(error);
        alert('Error fetching user data.');
      },
    });
  });