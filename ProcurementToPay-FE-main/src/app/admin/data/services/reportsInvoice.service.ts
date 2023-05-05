// /api/v1/reports/customers/statement/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsInvoiceService {

  constructor(private http: HttpClient) { }

  generateCustomerStatementPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/customers/statement/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is payments done", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generateCustomerStatementExcelReport(params: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/*****************/`,
      {
        params,
        responseType: "text",
      }
    );
  }
  generatePaymentRecievedPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/*****************/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is payments recieved", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generatePaymentRecievedExcelReport(params: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/*****************/`,
      {
        params,
        responseType: "text",
      }
    );
  }

  generateVatPaidPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/vat/supplier`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is VAT paid per supplier", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generateVatPaidExcelReport(params: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/*****************/`,
      {
        params,
        responseType: "text",
      }
    );
  }

  generateVatRecievedPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/vat/recieved`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is VAT recieved", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generateVatRecievedExcelReport(params: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/*****************/`,
      {
        params,
        responseType: "text",
      }
    );
  }

  generateIncomeWHPaidPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/vat/income_wth_paid/supplier/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is Income withholding paid", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generateIncomeWHPaidExcelReport(params: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/*****************/`,
      {
        params,
        responseType: "text",
      }
    );
  }

  generateIncomeWHRecievedPdfReport(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.baseUrl}/*****************/`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("Hey this is Income withholding recieved", response);
        return {
          filename: "Report",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generateIncomeWHRecievedExcelReport(params: any): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/*****************/`,
      {
        params,
        responseType: "text",
      }
    );
  }


//********************************************************************************************************* */
//  General VAT

generateGeneralVatPaidPdfReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Accept", "application/pdf");

  let requestOptions: any = {
    params: params,
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };
  let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/vat/paid`;

  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      console.log("Hey this is general VAT paid", response);
      return {
        filename: "Report",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
}

generateGeneralVatPaidExcelReport(params: any): Observable<any> {
  return this.http.get(
    `${environment.baseUrl}/*****************/`,
    {
      params,
      responseType: "text",
    }
  );
}

generateGeneralVatRecievedPdfReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Accept", "application/pdf");

  let requestOptions: any = {
    params: params,
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };
  let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/vat/recieved`;

  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      console.log("Hey this is general vat recieved", response);
      return {
        filename: "Report",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
}

generateGeneralVatRecievedExcelReport(params: any): Observable<any> {
  return this.http.get(
    `${environment.baseUrl}/*****************/`,
    {
      params,
      responseType: "text",
    }
  );
}

//********************************************************************************************************* */
//  General Income VAT

generateGeneralIncomeVatPaidPdfReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Accept", "application/pdf");

  let requestOptions: any = {
    params: params,
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };
  let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/vat/income_wth_paid`;

  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      console.log("Hey this is general income vat paid", response);
      return {
        filename: "Report",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
}

generateGeneralIncomeVatPaidExcelReport(params: any): Observable<any> {
  return this.http.get(
    `${environment.baseUrl}/*****************/`,
    {
      params,
      responseType: "text",
    }
  );
}

generateGeneralIncomeVatRecievedPdfReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Accept", "application/pdf");

  let requestOptions: any = {
    params: params,
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };
  let API_URL = `${environment.baseUrl}/*******Recieved Not ready*********/`;

  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      console.log("Hey this is gen income recieved", response);
      return {
        filename: "Report",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
}

generateGeneralIncomeVatRecievedExcelReport(params: any): Observable<any> {
  return this.http.get(
    `${environment.baseUrl}/*****************/`,
    {
      params,
      responseType: "text",
    }
  );
}

// *************************************************************************************************
//  General Payments/Statements
generateGeneralPaymentsToPdfReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Accept", "application/pdf");

  let requestOptions: any = {
    params: params,
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };
  let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/payments/all`;

  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      console.log("Hey this is gen payments", response);
      return {
        filename: "Report",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
}

generateGeneralPaymentsToExcelReport(params: any): Observable<any> {
  return this.http.get(
    `${environment.baseUrl}/*****************/`,
    {
      params,
      responseType: "text",
    }
  );
}

generateGeneralPaymentsFromPdfReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Accept", "application/pdf");

  let requestOptions: any = {
    params: params,
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };
  let API_URL = `${environment.baseUrl}/payment from report not`;

  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      console.log("Hey this is gen payments from", response);
      return {
        filename: "Report",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
}

generateGeneralPaymentsFromExcelReport(params: any): Observable<any> {
  return this.http.get(
    `${environment.baseUrl}/*****************/`,
    {
      params,
      responseType: "text",
    }
  );
}

generateGeneralStatementsPdfReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Accept", "application/pdf");

  let requestOptions: any = {
    params: params,
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };
  let API_URL = `${environment.baseUrl}/statement report not ready`;

  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      console.log("Hey this is gen statements", response);
      return {
        filename: "Report",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
}

generateGeneralStatementsExcelReport(params: any): Observable<any> {
  return this.http.get(
    `${environment.baseUrl}/*****************/`,
    {
      params,
      responseType: "text",
    }
  );
}


generateGeneralAgeingPdfReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Accept", "application/pdf");

  let requestOptions: any = {
    params: params,
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };
  let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/aging`;

  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      console.log("Hey this is gen payments from", response);
      return {
        filename: "Report",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
}

generateGeneralAgeingExcelReport(params: any): Observable<any> {
  return this.http.get(
    `${environment.baseUrl}/********Ageing*********/`,
    {
      params,
      responseType: "text",
    }
  );
}



generateGeneralPaymentStatusPdfReport(params: any): Observable<any> {
  let headers = new HttpHeaders();
  headers.append("Accept", "application/pdf");

  let requestOptions: any = {
    params: params,
    headers: headers,
    responseType: "blob",
    withCredentials: false,
  };
  let API_URL = `${environment.baseUrl}/api/v1/reports/transactions/per/status/`;

  return this.http.get(API_URL, requestOptions).pipe(
    map((response) => {
      console.log("Hey this is gen payments from", response);
      return {
        filename: "Report",
        data: new Blob([response], { type: "application/pdf" }),
      };
    })
  );
}

generateGeneralPaymentStatusExcelReport(params: any): Observable<any> {
  return this.http.get(
    `${environment.baseUrl}/********PaymentStatus*********/`,
    {
      params,
      responseType: "text",
    }
  );
}

}
