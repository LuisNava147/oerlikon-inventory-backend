
export interface AccessRequest {
    accessId: string
    applicantFullName: string
    visitorName: string
    accessReason: string
    accessDate: Date
    accessHour: string
    accessDuration: string
    accessUrl: string
    provider: Provider
    location: Location
}

export interface Assignment {
    assignmentId: string
    assignmentDate: Date
    assignmentReturnDate: Date
    assigmentStatus: string
    responsivaUrl?: string
    employee: Employee
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
    location: Location 
    device: Device[]
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
    locationId: number
    locationName: string
    locationAddress?: string
    employee: Employee[]
    device: Device[]
    provider: Provider[]
    access_request: AccessRequest[]
}

export interface Provider {
    providerId: string
    providerName: string
    providerEmail?: string 
    providerPhoneNumber?: string
    providerContactName: string    
    location: Location
    accessRequest: AccessRequest[]
}

export interface TicketIncident {
    ticketIncidentId: string
    ticketName: string
    ticketLink: string
    ticketDateOpening:  Date
    ticketDateClose: Date
    status?: string

}