
export interface AccessRequest {
    accessId: string
    applicantFullName: string
    visitorName: string
    accessReason: string
    accessDate: Date
    accessHour: string
    accessDuration: string
    accessUrl: string
    location: Location
}

export interface Assignment {
    assignmentId: string
    assignmentDate: Date
    assignmentReturnDate: Date
    assigmentStatus: string
    responsivaUrl?: string
    employee: Employee
    assignmentDevice: AssignmentDevice[]
}

export interface AssignmentDevice {
    assignmentDeviceId: string;
    device: Device
}

export interface User {
    userId: string
    userEmail: string
    userPassword: string
    userRoles: string[]
    employee: Employee
}

export interface Deparment {
    departmentId: string
    departmentName: string
    device: Device[]
    incident: Incident[]
    employee: Employee[]
    location: Location
    printerCount?: number
    employeeCount?: number
    deviceCount?: number
    mobileCount?: number
    accesoriesCount?: number
    barcodeCount?: number
    monitorCount?: number
}

export interface Device { 
    deviceId: string
    deviceHostName?: string
    deviceAssetNumber?: string
    deviceSerialTag: string
    deviceStatus: string
    deviceType: string
    deviceModel: string
    deviceBrand: string
    devicePassword?:string
    devicePin?: string
    ipAddress?: string
    sapName?: string
    deviceMAC?: string
    deviceAccount?: string
    deviceNote?: string
    location: Location 
    department?: Deparment
    employee?: Employee
    assignment: Assignment[]
    incident: Incident[]
}

export interface Employee {
    employeeId: string
    employeeName: string
    employeeLastName: string 
    employeePhoneNumber?: string
    employeeEmail: string
    devicesCount?:number
    location: Location 
    device: Device[]
    department: Deparment
    user: User  
}

export interface Incident {
    incidentId: string
    reportNumber: string
    incidentDateOpening:  Date
    status: string
    incidentDescription: string
    incidentNote: string
    incidentDateClose:  Date
    device?: Device
    department?: Deparment
}

export interface Location {
    locationId: number | string
    locationName: string
    locationAddress?: string
    employee: Employee[]
    device: Device[]
    access_request: AccessRequest[]
    employeesCount?: number
    devicesCount?: number
}

export interface TicketIncident {
    ticketIncidentId: string
    ticketName: string
    ticketLink: string
    ticketDateOpening:  Date
    ticketDateClose: Date
    status?: string
    ticketDescription: string

}