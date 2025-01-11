class AuthService {
    login(username, password) {
        // Call the API to authenticate and return a token
        return fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem("authToken", data.token);
          return data;
        });
    }
  
    logout() {
      localStorage.removeItem("authToken");
      window.location.reload();  // Or redirect to login page
    }
  
    getToken() {
      return localStorage.getItem("authToken");
    }
  
    isAuthenticated() {
      return !!this.getToken();
    }
}

export default new AuthService();
